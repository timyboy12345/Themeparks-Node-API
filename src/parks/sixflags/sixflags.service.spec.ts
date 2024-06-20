import { Test, TestingModule } from '@nestjs/testing';
import { SixflagsService } from './sixflags.service';
import { SixflagsTransferService } from './sixflags-transfer/sixflags-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('SixflagsService', () => {
  let service: SixflagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SixflagsService, SixflagsTransferService],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();

    service = module.get<SixflagsService>(SixflagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can retrieve parks', async () => {
    const data = await service.getParks();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(6);
  });

  it('can retrieve info for all parks', async () => {
    const data = await service.getParkServices();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(6);
  });
});
