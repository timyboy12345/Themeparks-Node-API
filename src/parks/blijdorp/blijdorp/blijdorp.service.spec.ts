import { Test, TestingModule } from '@nestjs/testing';
import { BlijdorpService } from './blijdorp.service';
import { HttpModule } from '@nestjs/axios';
import { BlijdorpTransferService } from '../blijdorp-transfer/blijdorp-transfer.service';
import { ConfigModule } from '@nestjs/config';

describe('BlijdorpService', () => {
  let service: BlijdorpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlijdorpService, BlijdorpTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<BlijdorpService>(BlijdorpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return info', () => {
    expect(service.getInfo().id).toBeDefined();
  });

  // TODO: Fix error in retrieving events
  // it('should return a list of POIs', async () => {
  //   const data = await service.getPois();
  //   expect(data).toBeInstanceOf(Array);
  // }, 1000 * 60);
});
