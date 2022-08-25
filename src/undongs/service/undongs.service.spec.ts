import { Test, TestingModule } from '@nestjs/testing';
import { UndongsService } from './undongs.service';

describe('UndongsService', () => {
  let service: UndongsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UndongsService],
    }).compile();

    service = module.get<UndongsService>(UndongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
