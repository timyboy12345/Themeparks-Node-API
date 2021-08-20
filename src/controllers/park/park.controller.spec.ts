import { Test, TestingModule } from '@nestjs/testing';
import { ParkController } from './park.controller';
import { CacheModule } from '@nestjs/common';
import { ParksService } from '../../_services/parks/parks.service';
import { ParksModule } from '../../parks/parks.module';

describe('ParkController', () => {
  let controller: ParkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkController],
      providers: [ParksService],
      imports: [CacheModule.register({ ttl: 0 }), ParksModule],
    }).compile();

    controller = module.get<ParkController>(ParkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
