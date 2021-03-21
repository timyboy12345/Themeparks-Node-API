import { Test, TestingModule } from '@nestjs/testing';
import { AttractionsIoThemeParkService } from './attractions-io-theme-park.service';

describe('AttractionsIoThemeParkService', () => {
  let service: AttractionsIoThemeParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttractionsIoThemeParkService],
    }).compile();

    service = module.get<AttractionsIoThemeParkService>(AttractionsIoThemeParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
