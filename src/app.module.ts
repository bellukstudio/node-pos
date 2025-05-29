import { Module } from '@nestjs/common';
import { CoreModule } from './core/module/core.module';
import { DatabaseModule } from './databases/database.module';
import { AdminModule } from './(admin)/admin.module';
import { AuthController } from './(admin)/auth/auth.controller';


@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    AdminModule,
  ],
  controllers: [AuthController],

})
export class AppModule { }
