import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { AuthModule } from "../auth/auth.module";
import { BranchController } from "./branch.controller";
import { BranchService } from "./branch.service";


@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([BranchEntity]),
    ],
    controllers: [BranchController],
    providers: [BranchService],
})
export class BranchModule { }