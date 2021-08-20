import { Test, TestingModule } from '@nestjs/testing';
import { ToverlandService } from './toverland.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ToverlandTransferService } from './toverland-transfer/toverland-transfer.service';

describe('ToverlandService', () => {
  let service: ToverlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [ToverlandService, ToverlandTransferService],
    }).compile();

    service = module.get<ToverlandService>(ToverlandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
