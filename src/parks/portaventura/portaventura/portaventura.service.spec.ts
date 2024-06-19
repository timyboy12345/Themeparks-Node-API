import { Test, TestingModule } from '@nestjs/testing';
import { PortaventuraService } from './portaventura.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';
import { LocaleModule } from '../../../_services/locale/locale.module';
import { PortaventuraBaseServiceService } from '../portaventura-base-service/portaventura-base-service.service';

describe('PortaventuraService', () => {
  let service: PortaventuraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
      providers: [PortaventuraService, PortaVenturaTransferService, PortaventuraBaseServiceService],
    }).compile();

    service = module.get<PortaventuraService>(PortaventuraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO: Fix porta ventura parks
  // it('should return info', () => {
  //   expect(service.getInfo().id).toBeDefined();
  // });
  //
  // it('should return a list of POIs', async () => {
  //   const data = await service.getPois();
  //   expect(data).toBeInstanceOf(Array);
  // });
});
