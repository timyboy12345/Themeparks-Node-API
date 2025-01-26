import { Test, TestingModule } from '@nestjs/testing';
import { ParqueWarnerService } from './parque-warner.service';
import { ParqueWarnerTransferService } from './parque-warner-transfer/parque-warner-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../_services/locale/locale.module';

describe('ParqueWarnerService', () => {
  let service: ParqueWarnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
      providers: [ParqueWarnerService, ParqueWarnerTransferService],
    }).compile();

    service = module.get<ParqueWarnerService>(ParqueWarnerService);
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
    expect(data.length).toBeGreaterThan(6);
  });
});
