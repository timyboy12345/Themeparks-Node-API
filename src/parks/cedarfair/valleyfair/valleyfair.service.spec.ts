import { Test, TestingModule } from '@nestjs/testing';
import { ValleyfairService } from './valleyfair.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';

describe('ValleyfairService', () => {
  let service: ValleyfairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [ValleyfairService, CedarfairTransferService],
    }).compile();

    service = module.get<ValleyfairService>(ValleyfairService);
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
