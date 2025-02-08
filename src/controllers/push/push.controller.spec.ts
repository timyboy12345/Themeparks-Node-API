import { Test, TestingModule } from '@nestjs/testing';
import { PushController } from './push.controller';
import { PushModule } from '../../database/push/push.module';
import { CacheModule } from '@nestjs/cache-manager';

describe('PushService', () => {
  let service: PushController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PushController],
      providers: [PushController],
      imports: [PushModule, CacheModule.register({ ttl: 0 })]
    }).compile();

    service = module.get<PushController>(PushController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
