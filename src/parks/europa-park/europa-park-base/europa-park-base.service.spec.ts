import { Test, TestingModule } from '@nestjs/testing';
import { EuropaParkBaseService } from './europa-park-base.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { EuropaParkTransferService } from '../europa-park-transfer/europa-park-transfer.service';

describe('EuropaParkBaseService', () => {
  let service: EuropaParkBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EuropaParkBaseService, EuropaParkTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<EuropaParkBaseService>(EuropaParkBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
