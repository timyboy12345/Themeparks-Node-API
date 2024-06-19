import { Module } from '@nestjs/common';
import { CompagnieDesAlpesBaseService } from './compagnie-des-alpes-base/compagnie-des-alpes-base.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CompagnieDesAlpesTransferService } from './compagnie-des-alpes-transfer/compagnie-des-alpes-transfer.service';
import { LocaleModule } from '../../_services/locale/locale.module';

@Module({
  providers: [CompagnieDesAlpesBaseService, CompagnieDesAlpesTransferService],
  exports: [CompagnieDesAlpesBaseService, CompagnieDesAlpesTransferService],
  imports: [
    HttpModule,
    LocaleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
})
export class CompagnieDesAlpesModule {
}
