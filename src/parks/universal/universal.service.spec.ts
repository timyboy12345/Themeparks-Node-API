import { Test, TestingModule } from '@nestjs/testing';
import { UniversalService } from './universal.service';
import { UniversalStudiosFloridaService } from './universal-studios-florida/universal-studios-florida.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UniversalTransferService } from './universal-transfer/universal-transfer.service';
import { UniversalStudiosHollywoodService } from './universal-studios-hollywood/universal-studios-hollywood.service';
import { IslandsOfAdventureService } from './islands-of-adventure/islands-of-adventure.service';

describe('UniversalService', () => {
  let service: UniversalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversalService, UniversalTransferService, UniversalStudiosFloridaService, UniversalStudiosHollywoodService, IslandsOfAdventureService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<UniversalService>(UniversalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
