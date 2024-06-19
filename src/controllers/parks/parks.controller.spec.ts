import { Test, TestingModule } from '@nestjs/testing';
import { ParksController } from './parks.controller';
import { ParksService } from '../../_services/parks/parks.service';
import { ParksModule } from '../../parks/parks.module';
import { CacheModule } from '@nestjs/cache-manager';

describe('ParksController', () => {
  let controller: ParksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParksController],
      providers: [ParksService],
      imports: [ParksModule, CacheModule.register({ ttl: 0 })],
    }).compile();

    controller = module.get<ParksController>(ParksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
