import { Test, TestingModule } from '@nestjs/testing';
import { ToverlandService } from './toverland.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ToverlandTransferService } from './toverland-transfer/toverland-transfer.service';
import { LocaleModule } from '../../_services/locale/locale.module';

describe('ToverlandService', () => {
  let service: ToverlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
      providers: [ToverlandService, ToverlandTransferService],
    }).compile();

    service = module.get<ToverlandService>(ToverlandService);
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
