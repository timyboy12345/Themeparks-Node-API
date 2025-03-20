import { Test, TestingModule } from '@nestjs/testing';
import { EuropaParkService } from './europa-park.service';
import { EuropaParkTransferService } from '../europa-park-transfer/europa-park-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('EuropaParkService', () => {
  let service: EuropaParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EuropaParkService, EuropaParkTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<EuropaParkService>(EuropaParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
