import { Test, TestingModule } from '@nestjs/testing';
import { PortaventuraService } from './portaventura.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';

describe('PortaventuraService', () => {
  let service: PortaventuraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [PortaventuraService, PortaVenturaTransferService],
    }).compile();

    service = module.get<PortaventuraService>(PortaventuraService);
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
