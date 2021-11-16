import { Test, TestingModule } from '@nestjs/testing';
import { PlopsalandDePanneTransferService } from './plopsaland-de-panne-transfer.service';

describe('PlopsalandDePanneTransferService', () => {
  let service: PlopsalandDePanneTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlopsalandDePanneTransferService],
    }).compile();

    service = module.get<PlopsalandDePanneTransferService>(PlopsalandDePanneTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
