import { Test, TestingModule } from '@nestjs/testing';
import { KentuckyKingdomService } from './kentucky-kingdom.service';
import { HerschendTransferService } from '../herschend-transfer/herschend-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('KentuckyKingdomService', () => {
  let service: KentuckyKingdomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KentuckyKingdomService, HerschendTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<KentuckyKingdomService>(KentuckyKingdomService);
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
  }, 5000 * 60);
});
