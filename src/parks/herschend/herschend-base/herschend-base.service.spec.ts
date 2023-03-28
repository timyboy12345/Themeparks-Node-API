import { Test, TestingModule } from '@nestjs/testing';
import { HerschendBaseService } from './herschend-base.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HerschendTransferService } from '../herschend-transfer/herschend-transfer.service';

describe('HerschendBaseService', () => {
  let service: HerschendBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HerschendBaseService, HerschendTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<HerschendBaseService>(HerschendBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
