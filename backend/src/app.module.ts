import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramModule } from './modules/telegram/telegram.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayModule } from './modules/gateway/gateway.module';
import { ApiModule } from './modules/api/api.module';
import { BlockchainListenerModule } from './modules/blockchainListener/blockchainListener.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: {
        abortEarly: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone: 'Z',
        synchronize: true,
        entities: ['dist/db/entities/*.entity.js'],
        migrations: ['dist/db/migrations/*.js'],
        charset: 'utf8mb4',
      }),
      inject: [ConfigService],
    }),
    TelegramModule,
    GatewayModule,
    ApiModule,
    BlockchainListenerModule,
  ],
})
export class AppModule {}
