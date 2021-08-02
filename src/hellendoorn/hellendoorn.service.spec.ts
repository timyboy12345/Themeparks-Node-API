import { Test, TestingModule } from '@nestjs/testing';
import { HellendoornService } from './hellendoorn.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('HellendoornService', () => {
  let service: HellendoornService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [HellendoornService],
    }).compile();

    service = module.get<HellendoornService>(HellendoornService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
