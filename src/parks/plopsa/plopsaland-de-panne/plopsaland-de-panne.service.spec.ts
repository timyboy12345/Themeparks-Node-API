import { Test, TestingModule } from '@nestjs/testing';
import { PlopsalandDePanneService } from './plopsaland-de-panne.service';
import { PlopsaTransferService } from '../plopsa-transfer/plopsa-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('PlopsalandDePanneService', () => {
  let service: PlopsalandDePanneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlopsalandDePanneService, PlopsaTransferService],
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
    }).compile();

    service = module.get<PlopsalandDePanneService>(PlopsalandDePanneService);
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
    expect(data.length).toBeGreaterThan(6);
  }, 1000 * 60);
});
