import { Test, TestingModule } from '@nestjs/testing';
import { BobbejaanlandService } from './bobbejaanland.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('BobbejaanlandService', () => {
  let service: BobbejaanlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BobbejaanlandService],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();

    service = module.get<BobbejaanlandService>(BobbejaanlandService);
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
