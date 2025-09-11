import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryProductEntity } from '../../databases/entities/product/category-product.entity';
import { CategoryProductController } from "./category-product.controller";
import { CategoryProductService } from "./category-product.service";


@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([CategoryProductEntity])
    ],
    controllers: [CategoryProductController],
    providers: [CategoryProductService],
})
export class CategoryProductModule { }