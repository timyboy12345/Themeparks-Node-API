import { Test, TestingModule } from '@nestjs/testing';
import { EnergylandiaService } from './energylandia.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('EnergylandiaService', () => {
  let service: EnergylandiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [EnergylandiaService],
    }).compile();

    service = module.get<EnergylandiaService>(EnergylandiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return info', () => {
    expect(service.getInfo().id).toBeDefined();
  });

  it('should return a list of POIs', async () => {
    const data = await service.getPois();
    expect(data).toBeInstanceOf(Array);
  });

  it('should return a list of Shows', async () => {
    const data = await service.getShows();
    expect(data).toBeInstanceOf(Array);
  });
});
