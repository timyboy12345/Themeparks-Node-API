import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './_services/app.service';
import { ParksService } from './_services/parks/parks.service';
import { CacheModule, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ParksModule } from './parks/parks.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), CacheModule.register({ ttl: 0 }), ParksModule],
      controllers: [AppController],
      providers: [AppService, ParksService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('General parks', () => {
    it('Be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
