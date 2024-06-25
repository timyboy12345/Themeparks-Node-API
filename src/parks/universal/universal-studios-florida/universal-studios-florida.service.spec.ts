import { Test, TestingModule } from '@nestjs/testing';
import { UniversalStudiosFloridaService } from './universal-studios-florida.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UniversalTransferService } from '../universal-transfer/universal-transfer.service';

describe('UniversalStudiosFloridaService', () => {
  let service: UniversalStudiosFloridaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversalStudiosFloridaService, UniversalTransferService],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();

    service = module.get<UniversalStudiosFloridaService>(UniversalStudiosFloridaService);
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
