import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalibiBelgiumService } from './belgium/walibi-belgium.service';
import { WalibiHollandService } from './holland/walibi-holland.service';
import { WalibiService } from './walibi.service';
import { WalibiTransferService } from './walibi-transfer/walibi-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { WalibiFranceService } from './france/walibi-france.service';

@Module({

  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [WalibiBelgiumService, WalibiHollandService, WalibiFranceService],
  providers: [WalibiBelgiumService, WalibiHollandService, WalibiFranceService, WalibiService, WalibiTransferService],
})
export class WalibiModule {
}
