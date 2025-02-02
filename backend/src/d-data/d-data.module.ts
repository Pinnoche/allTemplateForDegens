import { Module } from '@nestjs/common';
import { DDataService } from './d-data.service';
import { DDataController } from './d-data.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from './schemas/d-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
    UsersModule,
    AuthModule,
  ],
  controllers: [DDataController],
  providers: [DDataService],
})
export class DDataModule {}
