import { Test, TestingModule } from '@nestjs/testing';
import { PortaventuraServiceService } from './portaventura-service.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('PortaventuraServiceService', () => {
  let service: PortaventuraServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
      providers: [PortaventuraServiceService, PortaVenturaTransferService],
    }).compile();

    service = module.get<PortaventuraServiceService>(PortaventuraServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
