import { Test, TestingModule } from '@nestjs/testing';
import { ArtisService } from './artis.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ArtisTransferService } from './artis-transfer/artis-transfer.service';

describe('ArtisService', () => {
  let service: ArtisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [ArtisService, ArtisTransferService],
    }).compile();

    service = module.get<ArtisService>(ArtisService);
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
  }, 1000 * 60);
});
