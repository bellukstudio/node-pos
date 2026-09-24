import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierController } from "./supplier.controller";
import { SupplierService } from "./supplier.service";
import { SupplyManagementEntity } from "../../databases/entities/supply/supply-management.entity";

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