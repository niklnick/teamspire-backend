import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppRoutingModlue } from './app-routing.module';
import { TypeOrmConfigService } from './config/typeorm-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        AppRoutingModlue
    ]
})
export class AppModule { }
