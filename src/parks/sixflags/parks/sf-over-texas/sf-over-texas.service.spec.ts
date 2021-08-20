import { Test, TestingModule } from '@nestjs/testing';
import { SfOverTexasService } from './sf-over-texas.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('SfOverTexasService', () => {
  let service: SfOverTexasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SfOverTexasService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<SfOverTexasService>(SfOverTexasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
