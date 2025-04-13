import { Module } from '@nestjs/common';
import { EuropaParkService } from './europa-park/europa-park.service';
import { EuropaParkBaseService } from './europa-park-base/europa-park-base.service';
import { RulanticaService } from './rulantica/rulantica.service';
import { EuropaParkTransferService } from './europa-park-transfer/europa-park-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../_services/locale/locale.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [EuropaParkService, EuropaParkBaseService, RulanticaService, EuropaParkTransferService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
    LocaleModule,
    CacheModule.register({
      ttl: 1000 * 60
    }),
  ],
  exports: [EuropaParkService, RulanticaService],
})
export class EuropaParkModule {
}
