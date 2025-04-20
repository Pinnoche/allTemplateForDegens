import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DDataModule } from './d-data/d-data.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
// import { verifySubdomain } from './verifySubdomain';
// import { UsersController } from './users/users.controller';
// import { DDataController } from './d-data/d-data.controller';
import { Reserved_Subdomain } from './reserved-subdomain';
import { SuperadminModule } from './superadmin/superadmin.module';
import { Role, RoleSchema } from './roles/schema/roles.schema';
import { RoleFactory } from './roles/roles.factory';

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
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    UsersModule,
    DDataModule,
    AuthModule,
    RolesModule,
    SuperadminModule,
  ],
  controllers: [AppController],
  providers: [AppService, Reserved_Subdomain, RoleFactory],
})
// export class AppModule implements NestModule {
// configure(consumer: MiddlewareConsumer) {
//   consumer.apply(verifySubdomain).forRoutes(DDataController);
// }
// }
export class AppModule {}
