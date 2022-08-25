import { Test, TestingModule } from '@nestjs/testing';
import { UndongsController } from './undongs.controller';

describe('UndongsController', () => {
  let controller: UndongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UndongsController],
    }).compile();

    controller = module.get<UndongsController>(UndongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
