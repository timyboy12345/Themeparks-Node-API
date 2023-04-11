import { Test, TestingModule } from '@nestjs/testing';
import { DisneylandParisStudiosService } from './disneyland-paris-studios.service';
import { DisneylandParisTransferService } from './disneyland-paris-transfer/disneyland-paris-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('DisneylandParisStudiosService', () => {
  let service: DisneylandParisStudiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
      providers: [
        DisneylandParisStudiosService,
        DisneylandParisTransferService,
      ],
    }).compile();

    service = module.get<DisneylandParisStudiosService>(DisneylandParisStudiosService);
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
  }, 1000 * 60);
});
