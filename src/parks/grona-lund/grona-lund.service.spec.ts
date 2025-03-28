import { Test, TestingModule } from '@nestjs/testing';
import { GronaLundService } from './grona-lund.service';
import { ConfigModule } from '@nestjs/config';
import { GronaLundTransferService } from './grona-lund-transfer/grona-lund-transfer.service';
import { HttpModule } from '@nestjs/axios';

describe('GronaLundService', () => {
  let service: GronaLundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GronaLundService, GronaLundTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<GronaLundService>(GronaLundService);
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
    expect(data.length).toBeGreaterThan(6);
  }, 1000 * 60);
});
