import { Test, TestingModule } from '@nestjs/testing';
import { WalibiBelgiumService } from './walibi-belgium.service';
import { WalibiTransferService } from '../walibi-transfer/walibi-transfer.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('BelgiumService', () => {
  let service: WalibiBelgiumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [WalibiBelgiumService, WalibiTransferService],
    }).compile();

    service = module.get<WalibiBelgiumService>(WalibiBelgiumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return info', () => {
    expect(service.getInfo().id).toBeDefined();
  });

  it('should return a list of POIs', async () => {
    const data = await service.getPois();
    expect(data).toBeInstanceOf(Array);
  });
});
