import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common"
import { AllExceptionsFilter } from "../filters/all-exception.filter";
import { ResponseTransformInterceptor } from "../interceptors/response-api.interceptor";
import { ThrottlerModule } from "@nestjs/throttler/dist/throttler.module";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard } from "@nestjs/throttler";

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 60,
            limit: 10,
        }]),
        ConfigModule.forRoot({
            envFilePath: '.env.local',
            isGlobal: true,
        }),

    ],
    providers: [
        { provide: APP_FILTER, useClass: AllExceptionsFilter },
        { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class CoreModule { }