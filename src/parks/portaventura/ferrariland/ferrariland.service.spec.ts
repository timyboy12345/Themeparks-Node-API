import { Test, TestingModule } from '@nestjs/testing';
import { FerrariLandService } from './ferrariland.service';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('FerrarilandService', () => {
  let service: FerrariLandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [FerrariLandService, PortaVenturaTransferService],
    }).compile();

    service = module.get<FerrariLandService>(FerrariLandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
