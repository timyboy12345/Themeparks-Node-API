import { Module } from '@nestjs/common';
import { EuropaParkService } from './europa-park/europa-park.service';
import { EuropaParkBaseService } from './europa-park-base/europa-park-base.service';
import { RulanticaService } from './rulantica/rulantica.service';
import { EuropaParkTransferService } from './europa-park-transfer/europa-park-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [EuropaParkService, EuropaParkBaseService, RulanticaService, EuropaParkTransferService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [EuropaParkService, RulanticaService],
})
export class EuropaParkModule {
}
