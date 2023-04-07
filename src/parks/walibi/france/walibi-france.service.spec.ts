import { Test, TestingModule } from '@nestjs/testing';
import { WalibiFranceService } from './walibi-france.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WalibiTransferService } from '../walibi-transfer/walibi-transfer.service';

describe('WalibiFranceService', () => {
  let service: WalibiFranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [WalibiFranceService, WalibiTransferService],
    }).compile();

    service = module.get<WalibiFranceService>(WalibiFranceService);
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
