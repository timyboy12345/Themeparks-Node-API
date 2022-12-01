import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { ParksController } from './parks/parks.controller';
import { ParksService } from '../_services/parks/parks.service';
import { ConfigModule } from '@nestjs/config';
import { ParksModule } from '../parks/parks.module';
import { ParkController } from './park/park.controller';
import { DatabaseModule } from '../database/database.module';
import { ParkHistoryController } from './park-history/park-history.controller';
import { LocaleModule } from '../_services/locale/locale.module';

@Module({
  controllers: [ParksController, ParkController, ParkHistoryController],
  imports: [
    CacheModule.register({
      ttl: 60 * 5,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
    HttpModule,
    ParksModule,
    DatabaseModule,
    LocaleModule
  ],
  providers: [
    ParksService
  ],
})
export class ControllersModule {
}
