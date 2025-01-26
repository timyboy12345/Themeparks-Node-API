import { Test, TestingModule } from '@nestjs/testing';
import { WorldsOfFunService } from './worlds-of-fun.service';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('WorldsOfFunService', () => {
  let service: WorldsOfFunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [WorldsOfFunService, CedarfairTransferService],
    }).compile();

    service = module.get<WorldsOfFunService>(WorldsOfFunService);
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
