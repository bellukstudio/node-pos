import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesReportEntity } from "src/databases/entities/report/sales-report.entity";
import { StockReportEntity } from "src/databases/entities/report/stock-report.entity";
import { FinancialStatementEntity } from '../../databases/entities/report/financial-statement.entity';
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([SalesReportEntity, StockReportEntity, FinancialStatementEntity]),
    ],
    controllers: [
        ReportController
    ],
    providers: [
        ReportService
    ],
})
export class ReportModule { }