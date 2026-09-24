import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { BranchController } from "./branch.controller";
import { BranchService } from "./branch.service";
import { BranchEntity } from "../../databases/entities/branch/branch.entity";


@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([BranchEntity]),
    ],
    controllers: [BranchController],
    providers: [BranchService],
})
export class BranchModule { }