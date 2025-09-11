import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplyManagementEntity } from "src/databases/entities/supply/supply-management.entity";
import { SupplierController } from "./supplier.controller";
import { SupplierService } from "./supplier.service";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([SupplyManagementEntity])
    ],
    controllers: [
        SupplierController,
    ],
    providers: [
        SupplierService,
    ]
})

export class SupplierModule { }