import { Test, TestingModule } from '@nestjs/testing';
import { ToverlandService } from './toverland.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('ToverlandService', () => {
  let service: ToverlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [ToverlandService],
    }).compile();

    service = module.get<ToverlandService>(ToverlandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
