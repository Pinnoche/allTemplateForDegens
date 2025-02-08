import { Test, TestingModule } from '@nestjs/testing';
import { Superadmin } from './superadmin';

describe('Superadmin', () => {
  let provider: Superadmin;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Superadmin],
    }).compile();

    provider = module.get<Superadmin>(Superadmin);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
