import { Test, TestingModule } from '@nestjs/testing';
import { WalibiService } from './walibi.service';
import { WalibiTransferService } from './walibi-transfer/walibi-transfer.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('WalibiService', () => {
  let service: WalibiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalibiService, WalibiTransferService],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();

    service = module.get<WalibiService>(WalibiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
