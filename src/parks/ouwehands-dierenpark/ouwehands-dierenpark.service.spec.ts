import { Test, TestingModule } from '@nestjs/testing';
import { OuwehandsDierenparkService } from './ouwehands-dierenpark.service';
import { OuwehandsDierenparkTransferService } from './ouwehands-dierenpark-transfer/ouwehands-dierenpark-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('OuwehandsDierenparkService', () => {
  let service: OuwehandsDierenparkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [OuwehandsDierenparkService, OuwehandsDierenparkTransferService],
    }).compile();

    service = module.get<OuwehandsDierenparkService>(OuwehandsDierenparkService);
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
