import { Test, TestingModule } from '@nestjs/testing';
import { EftelingController } from './efteling.controller';

describe('EftelingController', () => {
  let controller: EftelingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EftelingController],
    }).compile();

    controller = module.get<EftelingController>(EftelingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
