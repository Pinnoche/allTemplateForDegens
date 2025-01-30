import { Test, TestingModule } from '@nestjs/testing';
import { DDataService } from './d-data.service';

describe('DDataService', () => {
  let service: DDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DDataService],
    }).compile();

    service = module.get<DDataService>(DDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
