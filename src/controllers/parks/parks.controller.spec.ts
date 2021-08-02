import { Test, TestingModule } from '@nestjs/testing';
import { ParksController } from './parks.controller';

describe('ParksController', () => {
  let controller: ParksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParksController],
    }).compile();

    controller = module.get<ParksController>(ParksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
