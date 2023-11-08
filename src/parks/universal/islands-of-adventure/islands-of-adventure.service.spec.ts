import { Test, TestingModule } from '@nestjs/testing';
import { IslandsOfAdventureService } from './islands-of-adventure.service';
import { UniversalTransferService } from '../universal-transfer/universal-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('IslandsOfAdventureService', () => {
  let service: IslandsOfAdventureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IslandsOfAdventureService, UniversalTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<IslandsOfAdventureService>(IslandsOfAdventureService);
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
