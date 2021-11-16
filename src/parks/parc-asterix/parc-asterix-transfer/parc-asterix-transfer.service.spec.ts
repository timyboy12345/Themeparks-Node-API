import { Test, TestingModule } from '@nestjs/testing';
import { ParcAsterixTransferService } from './parc-asterix-transfer.service';
import { ConfigModule } from '@nestjs/config';

describe('ParcAsterixTransferService', () => {
  let service: ParcAsterixTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcAsterixTransferService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    service = module.get<ParcAsterixTransferService>(ParcAsterixTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
