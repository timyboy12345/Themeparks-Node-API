import { Test, TestingModule } from '@nestjs/testing';
import { SafariparkService } from './safaripark.service';
import { HttpModule } from '@nestjs/axios';
import { BeekseBergenTransferService } from '../beekse-bergen-transfer/beekse-bergen-transfer.service';
import { ConfigModule } from '@nestjs/config';

describe('SafariparkService', () => {
  let service: SafariparkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SafariparkService, BeekseBergenTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ],
    }).compile();

    service = module.get<SafariparkService>(SafariparkService);
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
