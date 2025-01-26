import { Module } from '@nestjs/common';
import { SafariparkService } from './safaripark/safaripark.service';
import { SpeellandService } from './speelland/speelland.service';
import { BeekseBergenTransferService } from './beekse-bergen-transfer/beekse-bergen-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LocaleModule } from '../../_services/locale/locale.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
    LocaleModule,
  ],
  providers: [SafariparkService, SpeellandService, BeekseBergenTransferService],
  exports: [SafariparkService, SpeellandService],
})
export class BeekseBergenModule {
}
