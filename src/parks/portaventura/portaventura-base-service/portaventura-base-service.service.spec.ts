import { Test, TestingModule } from '@nestjs/testing';
import { PortaventuraBaseServiceService } from './portaventura-base-service.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('PortaventuraServiceService', () => {
  let service: PortaventuraBaseServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
      providers: [PortaventuraBaseServiceService, PortaVenturaTransferService],
    }).compile();

    service = module.get<PortaventuraBaseServiceService>(PortaventuraBaseServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
