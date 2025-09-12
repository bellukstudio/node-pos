import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from "@nestjs/core"
import { BranchModule } from './branch/branch.module';
import { CategoryProductModule } from './category_product/category-product.module';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionDetailModule } from './transaction_detail/transaction_detail.module';
import { CustomerModule } from './customer/customer.module';
import { SupplierModule } from './supplier/supplier.module';
import { DetailPurchaseModule } from './detail_purchase/detail-purchase.module';
import { PurchaseProductModule } from './purchase_product/purchase-product.module';
import { ReturnGoodsModule } from './return_goods/return-goods.module';
import { MutationStockModule } from './mutation_stock/mutation-stock.module';
import { UserModule } from './user/user.module';
import { ReportModule } from './reports/report.module';
import { SettingsModule } from './settings/settings.module';
import { PromoModule } from './promo/promo.module';
@Module({
  imports: [
    AuthModule,
    RouterModule.register([
      {
        path: "admin",
        children: [
          {
            path: "auth",
            module: AuthModule,
          },
          {
            path: "branch",
            module: BranchModule
          },
          {
            path: 'user',
            module: UserModule
          },
          {
            path: "category-product",
            module: CategoryProductModule
          },
          {
            path: "product",
            module: ProductModule
          },
          {
            path: "transaction",
            module: TransactionModule
          },
          {
            path: "transaction-detail",
            module: TransactionDetailModule
          },
          {
            path: 'customer',
            module: CustomerModule
          },
          {
            path: 'supplier',
            module: SupplierModule
          },
          {
            path: 'purchase-product',
            module: PurchaseProductModule
          },
          {
            path: 'detail-purchase',
            module: DetailPurchaseModule
          },
          {
            path: 'return-of-goods',
            module: ReturnGoodsModule
          },
          {
            path: 'mutation-stock',
            module: MutationStockModule
          },
          {
            path: 'report',
            module: ReportModule
          },
          {
            path: 'setting',
            module: SettingsModule
          },
          {
            path: 'promo',
            module: PromoModule
          }
        ],
      },
    ]),
  ],

})
export class AdminModule { }
