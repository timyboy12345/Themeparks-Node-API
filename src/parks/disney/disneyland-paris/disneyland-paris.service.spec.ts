import { Test, TestingModule } from '@nestjs/testing';
import { DisneylandParisService } from './disneyland-paris.service';
import { DisneylandParisTransferService } from './disneyland-paris-transfer/disneyland-paris-transfer.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('DisneylandParisService', () => {
  let service: DisneylandParisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [DisneylandParisService, DisneylandParisTransferService],
    }).compile();

    service = module.get<DisneylandParisService>(DisneylandParisService);
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
