import { Test, TestingModule } from '@nestjs/testing';
import { RulanticaService } from './rulantica.service';
import { EuropaParkTransferService } from '../europa-park-transfer/europa-park-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('RulanticaService', () => {
  let service: RulanticaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulanticaService, EuropaParkTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<RulanticaService>(RulanticaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
