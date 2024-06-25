import { Test, TestingModule } from '@nestjs/testing';
import { HansaParkService } from './hansa-park.service';
import { HansaParkTransferService } from './hansa-park-transfer/hansa-park-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LocaleModule } from '../../_services/locale/locale.module';

describe('HansaParkService', () => {
  let service: HansaParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HansaParkService, HansaParkTransferService],
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
    }).compile();

    service = module.get<HansaParkService>(HansaParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return info', () => {
    expect(service.getInfo().id).toBeDefined();
  });

  it('should return a list of POIs', async () => {
    let tries = [0, 1, 2, 3, 4, 5];

    for (const t of tries) {
      try {
        const data = await service.getPois();
        expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(6);
        break;
      } catch (e) {
        console.error(`Error while fetching Hansa Park times, trying again: ${t}`);
      }
    }
  }, 1000 * 60);
});
