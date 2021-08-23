import { Test, TestingModule } from '@nestjs/testing';
import { ParcAsterixService } from './parc-asterix.service';
import { ParcAsterixTransferService } from './parc-asterix-transfer/parc-asterix-transfer.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('ParkAsterixService', () => {
  let service: ParcAsterixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [ParcAsterixService, ParcAsterixTransferService],
    }).compile();

    service = module.get<ParcAsterixService>(ParcAsterixService);
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
