import { Test, TestingModule } from '@nestjs/testing';
import { DollywoodService } from './dollywood.service';
import { HerschendTransferService } from '../herschend-transfer/herschend-transfer.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('DollywoodService', () => {
  let service: DollywoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DollywoodService, HerschendTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<DollywoodService>(DollywoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
