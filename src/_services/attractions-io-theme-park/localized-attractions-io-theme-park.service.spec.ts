import { Test, TestingModule } from '@nestjs/testing';
import { LocalizedAttractionsIoThemeParkService } from './localized-attractions-io-theme-park.service';

describe('LocalizedAttractionsIoThemeParkService', () => {
  let service: LocalizedAttractionsIoThemeParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalizedAttractionsIoThemeParkService],
    }).compile();

    service = module.get<LocalizedAttractionsIoThemeParkService>(LocalizedAttractionsIoThemeParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
