import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { AuditLogEntity } from 'src/databases/entities/audit/log-audit.entity';
import { BranchEntity } from 'src/databases/entities/branch/branch.entity';
import { CategoryProductEntity } from 'src/databases/entities/product/category-product.entity';
import { ProductEntity } from 'src/databases/entities/product/product.entity';
import { DiscountNpromoEntity } from 'src/databases/entities/program/discount-npromo.entity';
import { PointsLoyaltyEntity } from 'src/databases/entities/program/points-loyalty.entity';
import { FinancialStatementEntity } from 'src/databases/entities/report/financial-statement.entity';
import { SalesReportEntity } from 'src/databases/entities/report/sales-report.entity';
import { StockReportEntity } from 'src/databases/entities/report/stock-report.entity';
import { PaymentMethodEntity } from 'src/databases/entities/sales/payment-method.entity';
import { SalesDetailEntity } from 'src/databases/entities/sales/sales-detail.entity';
import { SalesManagementEntity } from 'src/databases/entities/sales/sales-management.entity';
import { GeneralSettingEntity } from 'src/databases/entities/setting/general-setting.entity';
import { UserAccessRightsEntity } from 'src/databases/entities/setting/user-access-rights.entity';
import { ShiftActivityLogEntity } from 'src/databases/entities/shift/log-shift-activity.entity';
import { ShiftEntity } from 'src/databases/entities/shift/shift.entity';
import { MutationStockEntity } from 'src/databases/entities/stock/mutation-stock.entity';
import { ReturnOfGoodsEntity } from 'src/databases/entities/stock/return-of-goods.entity';
import { DetailPurchaseEntity } from 'src/databases/entities/supply/detail-purchase.entity';
import { PurchaseProductEntity } from 'src/databases/entities/supply/purchase-product.entity';
import { SupplyManagementEntity } from 'src/databases/entities/supply/supply-management.entity';
import { MemberEntity } from 'src/databases/entities/user/member.entity';
import { UserEntity } from 'src/databases/entities/user/users.entity';


import { DataSource } from 'typeorm';
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: configService.getOrThrow('POSTGRES_PORT'),
    database: configService.getOrThrow('POSTGRES_DATABASE'),
    username: configService.getOrThrow('POSTGRES_USERNAME'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    migrations: ['migrations/**'],
    entities: [UserEntity, AuditLogEntity, BranchEntity, CategoryProductEntity, ProductEntity, DiscountNpromoEntity,
        PointsLoyaltyEntity, FinancialStatementEntity, SalesReportEntity, StockReportEntity, PaymentMethodEntity, SalesDetailEntity,
        SalesManagementEntity, GeneralSettingEntity, UserAccessRightsEntity, ShiftEntity, ShiftActivityLogEntity, MutationStockEntity,
        ReturnOfGoodsEntity, DetailPurchaseEntity, PurchaseProductEntity, SupplyManagementEntity, MemberEntity]
});
