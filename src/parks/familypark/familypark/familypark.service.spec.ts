import { Test, TestingModule } from '@nestjs/testing';
import { FamilyparkService } from './familypark.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { FamilyparkTransferService } from '../familypark-transfer/familypark-transfer.service';
import { LocaleService } from '../../../_services/locale/locale.service';

describe('FamilyparkService', () => {
  let service: FamilyparkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyparkService, FamilyparkTransferService, LocaleService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<FamilyparkService>(FamilyparkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should return info', () => {
  //   expect(service.getInfo().id).toBeDefined();
  // });
  //
  // it('should return a list of POIs', async () => {
  //   const data = await service.getPois();
  //   expect(data).toBeInstanceOf(Array);
  //   expect(data.length).toBeGreaterThan(6);
  // }, 1000 * 60);
});
