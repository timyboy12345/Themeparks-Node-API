import { Test, TestingModule } from '@nestjs/testing';
import { MeilisearchService } from './meilisearch.service';
import { ConfigModule } from '@nestjs/config';
import { ParksService } from '../../_services/parks/parks.service';
import { ParksModule } from '../../parks/parks.module';

describe('MeilisearchService', () => {
  let service: MeilisearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ParksModule],
      providers: [MeilisearchService, ParksService],
    }).compile();

    service = module.get<MeilisearchService>(MeilisearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
