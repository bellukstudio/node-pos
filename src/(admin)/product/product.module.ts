import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/databases/entities/product/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";


@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([ProductEntity])
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule { }