import { UnauthorizedException, type INestApplication } from "@nestjs/common"
import type { ConfigService } from "@nestjs/config"
import { DocumentBuilder, SwaggerModule, type SwaggerDocumentOptions } from "@nestjs/swagger"
import type { FastifyReply, FastifyRequest } from "fastify"

function setupSwaggerMiddleware(app: INestApplication, configService: ConfigService) {
    const swaggerUsername = configService.get<string>("SWAGGER_USERNAME", "")
    const swaggerPassword = configService.get<string>("SWAGGER_PASSWORD", "super-long-secret-password-aiditel-abc102937")
    const credentialsRE = /^(?:basic) ([\w.~+-]+=*)$/i
    const controlRE = /[\x00-\x1F\x7F]/
    const userPassRE = /^([^:]*):(.*)$/

    async function swaggerAuthMiddleware(req: FastifyRequest["raw"], res: FastifyReply["raw"], next: (...args: any[]) => void) {
        const credentials = req.headers["authorization"] || null

        const done = (err: any) => {
            if (err) {
                res.statusCode = 401
                res.setHeader("WWW-Authenticate", 'Basic realm="Swagger Documentation"')
                res.end("Unauthorized")
                return
            }
            next()
        }

        if (typeof credentials !== "string") {
            done(new UnauthorizedException())
            return
        }

        const match = credentialsRE.exec(credentials)
        if (match === null) {
            done(new UnauthorizedException())
            return
        }

        const credentialsDecoded = Buffer.from(match[1], "base64").toString("utf8")
        if (controlRE.test(credentialsDecoded)) {
            done(new UnauthorizedException())
            return
        }

        const userPass = userPassRE.exec(credentialsDecoded)
        if (userPass === null) {
            done(new UnauthorizedException())
            return
        }

        if (userPass[1] !== swaggerUsername || userPass[2] !== swaggerPassword) {
            done(new UnauthorizedException())
            return
        }

        done(null)
    }

    app.use("/swagger*", swaggerAuthMiddleware)
    app.use("/api/swagger*", swaggerAuthMiddleware)
}

export default async function registerSwaggerModule(app: INestApplication, configService: ConfigService) {
    // Setup middleware SEBELUM SwaggerModule.setup
    setupSwaggerMiddleware(app, configService)

    const config = new DocumentBuilder()
        .setTitle("API Docs")
        .setDescription("The API documentation")
        .setVersion("1.0.0")
        .addBearerAuth()
        .addTag("POS")
        .build()

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
    }

    const documentFactory = () => SwaggerModule.createDocument(app, config, options)
    SwaggerModule.setup("swagger", app, documentFactory, {
        jsonDocumentUrl: "/swagger/api.json",
        swaggerUiEnabled: configService.get<string>("SWAGGER_UI_ENABLED", "true") === "true",
    })
}