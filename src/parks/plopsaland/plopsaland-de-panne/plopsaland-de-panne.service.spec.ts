import { Test, TestingModule } from '@nestjs/testing';
import { PlopsalandDePanneService } from './plopsaland-de-panne.service';
import { HttpModule } from '@nestjs/axios';
import { PlopsalandDePanneTransferService } from './plopsaland-de-panne-transfer/plopsaland-de-panne-transfer.service';

describe('PlopsalandDePanneService', () => {
  let service: PlopsalandDePanneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlopsalandDePanneService, PlopsalandDePanneTransferService],
      imports: [
        HttpModule,
      ]
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
