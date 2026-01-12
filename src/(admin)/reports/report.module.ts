import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FinancialStatementEntity } from '../../databases/entities/report/financial-statement.entity';
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";
import { SalesReportEntity } from "../../databases/entities/report/sales-report.entity";
import { StockReportEntity } from "../../databases/entities/report/stock-report.entity";

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