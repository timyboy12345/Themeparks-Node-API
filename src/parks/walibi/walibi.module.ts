import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalibiBelgiumService } from './belgium/walibi-belgium.service';
import { WalibiHollandService } from './holland/walibi-holland.service';
import { WalibiService } from './walibi.service';
import { WalibiTransferService } from './walibi-transfer/walibi-transfer.service';
import { HttpModule } from '@nestjs/axios';

@Module({

  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [WalibiBelgiumService, WalibiHollandService],
  providers: [WalibiHollandService, WalibiBelgiumService, WalibiService, WalibiTransferService],
})
export class WalibiModule {
}
