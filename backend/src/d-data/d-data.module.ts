import { Module } from '@nestjs/common';
import { DDataService } from './d-data.service';
import { DDataController } from './d-data.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from './schemas/d-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
    AuthModule,
  ],
  controllers: [DDataController],
  providers: [DDataService],
  exports: [MongooseModule, DDataService],
})
export class DDataModule {}
