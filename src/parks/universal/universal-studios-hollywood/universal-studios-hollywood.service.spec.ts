import { Test, TestingModule } from '@nestjs/testing';
import { UniversalStudiosHollywoodService } from './universal-studios-hollywood.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UniversalTransferService } from '../universal-transfer/universal-transfer.service';

describe('UniversalStudiosHollywoodService', () => {
  let service: UniversalStudiosHollywoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversalStudiosHollywoodService, UniversalTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<UniversalStudiosHollywoodService>(UniversalStudiosHollywoodService);
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
});
