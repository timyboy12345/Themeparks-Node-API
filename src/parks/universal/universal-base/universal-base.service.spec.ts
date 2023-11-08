import { Test, TestingModule } from '@nestjs/testing';
import { UniversalBaseService } from './universal-base.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UniversalTransferService } from '../universal-transfer/universal-transfer.service';

describe('UniversalBaseService', () => {
  let service: UniversalBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversalBaseService, UniversalTransferService],
      imports: [ConfigModule.forRoot(), HttpModule]
    }).compile();

    service = module.get<UniversalBaseService>(UniversalBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
