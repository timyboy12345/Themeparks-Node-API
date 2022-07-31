import { Test, TestingModule } from '@nestjs/testing';
import { ApenheulService } from './apenheul.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApenheulTransferService } from '../apenheul-transfer/apenheul-transfer.service';

describe('ApenheulService', () => {
  let service: ApenheulService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApenheulService, ApenheulTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ] }).compile();

    service = module.get<ApenheulService>(ApenheulService);
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
