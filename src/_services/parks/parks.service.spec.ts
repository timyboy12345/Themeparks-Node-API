import { Test, TestingModule } from '@nestjs/testing';
import { ParksService } from './parks.service';
import { ConfigModule} from '@nestjs/config';
import { HttpModule } from '@nestjs/common';
import { ParksModule } from '../../parks/parks.module';

describe('ParksService', () => {
  let service: ParksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule, ParksModule],
      providers: [ParksService],
    }).compile();

    service = module.get<ParksService>(ParksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
