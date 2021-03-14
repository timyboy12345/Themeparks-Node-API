import { Test, TestingModule } from '@nestjs/testing';
import { PortaventuraService } from './portaventura.service';

describe('PortaventuraService', () => {
  let service: PortaventuraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortaventuraService],
    }).compile();

    service = module.get<PortaventuraService>(PortaventuraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
