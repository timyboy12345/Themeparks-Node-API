import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BellewaerdeTransferService } from './bellewaerde-transfer/bellewaerde-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { BellewaerdeBaseService } from './bellewaerde-base/bellewaerde-base.service';
import { BellewaerdeService } from './bellewaerde/bellewaerde.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [BellewaerdeService, BellewaerdeTransferService, BellewaerdeBaseService],
  exports: [BellewaerdeService],
})
export class BellewaerdeModule {
}
