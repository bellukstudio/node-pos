import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MutationStockEntity } from '../../databases/entities/stock/mutation-stock.entity';
import { MutationStockController } from "./mutation-stock.controller";
import { MutationStockService } from "./mutation-stock.service";


@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([MutationStockEntity]),
    ],
    controllers: [
        MutationStockController
    ],
    providers: [
        MutationStockService
    ],
})
export class MutationStockModule { }
