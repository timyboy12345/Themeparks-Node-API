import { Test, TestingModule } from '@nestjs/testing';
import { WalibiBelgiumService } from './walibi-belgium.service';
import { WalibiBelgiumTransferService } from './walibi-belgium-transfer/walibi-belgium-transfer.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('BelgiumService', () => {
  let service: WalibiBelgiumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [WalibiBelgiumService, WalibiBelgiumTransferService],
    }).compile();

    service = module.get<WalibiBelgiumService>(WalibiBelgiumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
