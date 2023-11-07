import { Test, TestingModule } from '@nestjs/testing';
import { SeaworldBaseService } from './seaworld-base.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';

describe('SeaworldBaseService', () => {
  let service: SeaworldBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaworldBaseService, SeaworldTransferService],
      imports: [ConfigModule.forRoot(), HttpModule]
    }).compile();

    service = module.get<SeaworldBaseService>(SeaworldBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
