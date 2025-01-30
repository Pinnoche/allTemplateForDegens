import { Test, TestingModule } from '@nestjs/testing';
import { DDataController } from './d-data.controller';
import { DDataService } from './d-data.service';

describe('DDataController', () => {
  let controller: DDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DDataController],
      providers: [DDataService],
    }).compile();

    controller = module.get<DDataController>(DDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
