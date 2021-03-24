import { Test, TestingModule } from '@nestjs/testing';
import { AttractionsIoThemeParkService } from './attractions-io-theme-park.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('AttractionsIoThemeParkService', () => {
  let service: AttractionsIoThemeParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [AttractionsIoThemeParkService],
    }).compile();

    service = module.get<AttractionsIoThemeParkService>(AttractionsIoThemeParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
