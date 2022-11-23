import { HttpModule, Module } from '@nestjs/common';
import { SafariparkService } from './safaripark/safaripark.service';
import { SpeellandService } from './speelland/speelland.service';
import { BeekseBergenTransferService } from './beekse-bergen-transfer/beekse-bergen-transfer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [SafariparkService, SpeellandService, BeekseBergenTransferService],
  exports: [SafariparkService, SpeellandService]
})
export class BeekseBergenModule {}
