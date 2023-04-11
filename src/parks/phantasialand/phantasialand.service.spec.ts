import { Test, TestingModule } from '@nestjs/testing';
import { PhantasialandService } from './phantasialand.service';
import { PhantasialandTransferService } from './phantasialand-transfer/phantasialand-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('PhantasialandService', () => {
  let service: PhantasialandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [PhantasialandService, PhantasialandTransferService],
    }).compile();

    service = module.get<PhantasialandService>(PhantasialandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return info', () => {
    expect(service.getInfo().id).toBeDefined();
  });

  // TODO: Re-enable once phantasialand is back online
  // it('should return a list of POIs', async () => {
  //   const data = await service.getPois();
  //   expect(data).toBeInstanceOf(Array);
  // }, 1000 * 20);
});
