import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DDataModule } from './d-data/d-data.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    UsersModule,
    DDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
