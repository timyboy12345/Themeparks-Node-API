import { Test, TestingModule } from '@nestjs/testing';
import { SpeellandService } from './speelland.service';
import { BeekseBergenTransferService } from '../beekse-bergen-transfer/beekse-bergen-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('SpeellandService', () => {
  let service: SpeellandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeellandService, BeekseBergenTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ],
    }).compile();

    service = module.get<SpeellandService>(SpeellandService);
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
