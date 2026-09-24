import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogController } from './audit.controller';
import { AuditLogService } from './audit.service';
import { AuditLogEntity } from '../../databases/entities/audit/log-audit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuditLogEntity])],
    controllers: [AuditLogController],
    providers: [AuditLogService],

})
export class AuditLogModule { }
