import { Module } from '@nestjs/common';
import { CoreModule } from './core/module/core.module';
import { DatabaseModule } from './databases/database.module';


@Module({
  imports: [
    CoreModule,
    DatabaseModule,
  ],

})
export class AppModule { }
