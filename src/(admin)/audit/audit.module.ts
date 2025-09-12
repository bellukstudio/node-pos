import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogController } from './audit.controller';
import { AuditLogEntity } from 'src/databases/entities/audit/log-audit.entity';
import { AuditLogService } from './audit.service';

@Module({
    imports: [TypeOrmModule.forFeature([AuditLogEntity])],
    controllers: [AuditLogController],
    providers: [AuditLogService],

})
export class AuditLogModule { }
