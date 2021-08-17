import { Test, TestingModule } from '@nestjs/testing';
import { PlopsalandDePanneService } from './plopsaland-de-panne.service';

describe('PlopsalandDePanneService', () => {
  let service: PlopsalandDePanneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlopsalandDePanneService],
    }).compile();

    service = module.get<PlopsalandDePanneService>(PlopsalandDePanneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
