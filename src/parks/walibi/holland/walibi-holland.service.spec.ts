import { Test, TestingModule } from '@nestjs/testing';
import { WalibiHollandService } from './walibi-holland.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalibiTransferService } from '../walibi-transfer/walibi-transfer.service';

describe('WalibiHollandService', () => {
  let service: WalibiHollandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [WalibiHollandService, WalibiTransferService],
    }).compile();

    service = module.get<WalibiHollandService>(WalibiHollandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
