import { Test, TestingModule } from '@nestjs/testing';
import { AioThemeparkService } from './aio-themepark.service';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from './transfer-service/aio-transfer-service.service';
import { HttpModule } from '@nestjs/axios';

describe('AttractionsIoThemeParkService', () => {
  let service: AioThemeparkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [AioThemeparkService, AioTransferServiceService],
    }).compile();

    service = module.get<AioThemeparkService>(AioThemeparkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
