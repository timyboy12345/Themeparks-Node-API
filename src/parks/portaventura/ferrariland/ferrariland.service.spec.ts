import { Test, TestingModule } from '@nestjs/testing';
import { FerrariLandService } from './ferrariland.service';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../../_services/locale/locale.module';
import { PortaventuraBaseServiceService } from '../portaventura-base-service/portaventura-base-service.service';

describe('FerrarilandService', () => {
  let service: FerrariLandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
      providers: [FerrariLandService, PortaVenturaTransferService, PortaventuraBaseServiceService],
    }).compile();

    service = module.get<FerrariLandService>(FerrariLandService);
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
