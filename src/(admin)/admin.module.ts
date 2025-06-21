import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from "@nestjs/core"
import { BranchModule } from './branch/branch.module';
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
          }
        ],
      },
    ]),
  ],

})
export class AdminModule { }
