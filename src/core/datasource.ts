import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();
import { AuditLogEntity } from '../databases/entities/audit/log-audit.entity';
import { BranchEntity } from '../databases/entities/branch/branch.entity';
import { CategoryProductEntity } from '../databases/entities/product/category-product.entity';
import { ProductEntity } from '../databases/entities/product/product.entity';
import { DiscountNpromoEntity } from '../databases/entities/program/discount-npromo.entity';
import { PointsLoyaltyEntity } from '../databases/entities/program/points-loyalty.entity';
import { FinancialStatementEntity } from '../databases/entities/report/financial-statement.entity';
import { SalesReportEntity } from '../databases/entities/report/sales-report.entity';
import { StockReportEntity } from '../databases/entities/report/stock-report.entity';
import { PaymentMethodEntity } from '../databases/entities/sales/payment-method.entity';
import { SalesDetailEntity } from '../databases/entities/sales/sales-detail.entity';
import { SalesManagementEntity } from '../databases/entities/sales/sales-management.entity';
import { GeneralSettingEntity } from '../databases/entities/setting/general-setting.entity';
import { UserAccessRightsEntity } from '../databases/entities/setting/user-access-rights.entity';
import { ShiftActivityLogEntity } from '../databases/entities/shift/log-shift-activity.entity';
import { ShiftEntity } from '../databases/entities/shift/shift.entity';
import { MutationStockEntity } from '../databases/entities/stock/mutation-stock.entity';
import { ReturnOfGoodsEntity } from '../databases/entities/stock/return-of-goods.entity';
import { DetailPurchaseEntity } from '../databases/entities/supply/detail-purchase.entity';
import { PurchaseProductEntity } from '../databases/entities/supply/purchase-product.entity';
import { SupplyManagementEntity } from '../databases/entities/supply/supply-management.entity';
import { MemberEntity } from '../databases/entities/user/member.entity';
import { UserEntity } from '../databases/entities/user/users.entity';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

export  default new DataSource({
    type: 'postgres',
    host: configService.getOrThrow<string>('POSTGRES_HOST'),
    port: Number(configService.getOrThrow<string>('POSTGRES_PORT')),
    username: configService.getOrThrow<string>('POSTGRES_USERNAME'),
    password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
    database: configService.getOrThrow<string>('POSTGRES_DATABASE'),
    synchronize: false,
    logging: true,
    migrations: [__dirname + "/../migrations/*{.ts,.js}"],
    // entities: [
    //     __dirname + '/../databases/entities/**/*{.ts,.js}',
    // ],
    entities: [
        UserEntity,
        AuditLogEntity,
        BranchEntity,
        CategoryProductEntity,
        ProductEntity,
        DiscountNpromoEntity,
        PointsLoyaltyEntity,
        FinancialStatementEntity,
        SalesReportEntity,
        StockReportEntity,
        PaymentMethodEntity,
        SalesDetailEntity,
        SalesManagementEntity,
        GeneralSettingEntity,
        UserAccessRightsEntity,
        ShiftEntity,
        ShiftActivityLogEntity,
        MutationStockEntity,
        ReturnOfGoodsEntity,
        DetailPurchaseEntity,
        PurchaseProductEntity,
        SupplyManagementEntity,
        MemberEntity,
    ],
});

