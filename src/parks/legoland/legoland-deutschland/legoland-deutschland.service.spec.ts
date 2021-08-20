import { Test, TestingModule } from '@nestjs/testing';
import { LegolandDeutschlandService } from './legoland-deutschland.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('LegolandDeutschlandService', () => {
  let service: LegolandDeutschlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegolandDeutschlandService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<LegolandDeutschlandService>(LegolandDeutschlandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
