import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';


import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user/users.entity';
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: configService.getOrThrow('MYSQL_HOST'),
    port: configService.getOrThrow('MYSQL_PORT'),
    database: configService.getOrThrow('MYSQL_DATABASE'),
    username: configService.getOrThrow('MYSQL_USERNAME'),
    password: configService.getOrThrow('MYSQL_PASSWORD'),
    migrations: ['migrations/**'],
    entities:[UserEntity]
});
