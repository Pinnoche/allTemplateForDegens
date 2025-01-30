import { Module } from '@nestjs/common';
import { DDataService } from './d-data.service';
import { DDataController } from './d-data.controller';

@Module({
  controllers: [DDataController],
  providers: [DDataService],
})
export class DDataModule {}
