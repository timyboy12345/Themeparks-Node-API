import { Test, TestingModule } from '@nestjs/testing';
import { AioThemeparkService } from './aio-themepark.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from './transfer-service/aio-transfer-service.service';

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
