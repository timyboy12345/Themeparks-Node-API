import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalibiBelgiumService } from './belgium/walibi-belgium.service';
import { WalibiHollandService } from './holland/walibi-holland.service';
import { HttpModule } from '@nestjs/axios';
import { WalibiFranceService } from './france/walibi-france.service';
import { CompagnieDesAlpesModule } from '../compagnie-des-alpes/compagnie-des-alpes.module';
import { LocaleModule } from '../../_services/locale/locale.module';

@Module({

  imports: [
    HttpModule,
    CompagnieDesAlpesModule,
    LocaleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [WalibiBelgiumService, WalibiHollandService, WalibiFranceService],
  providers: [WalibiBelgiumService, WalibiHollandService, WalibiFranceService],
})
export class WalibiModule {
}
