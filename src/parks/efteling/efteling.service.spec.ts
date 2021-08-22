import { Test, TestingModule } from '@nestjs/testing';
import { EftelingService } from './efteling.service';
import { ConfigModule} from '@nestjs/config';
import { HttpModule} from '@nestjs/common';
import { EftelingTransferService } from './efteling-transfer/efteling-transfer.service';

describe('EftelingService', () => {
  let service: EftelingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [EftelingService, EftelingTransferService],
    }).compile();

    service = module.get<EftelingService>(EftelingService);
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
