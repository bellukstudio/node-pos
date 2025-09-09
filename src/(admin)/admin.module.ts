import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from "@nestjs/core"
import { BranchModule } from './branch/branch.module';
import { CategoryProductModule } from './categoryProduct/categoryProduct.module';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionDetailModule } from './transaction_detail/transaction_detail.module';
import { CustomerModule } from './customer/customer.module';
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
          }
        ],
      },
    ]),
  ],

})
export class AdminModule { }
