import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BellewaerdeService } from './bellewaerde/bellewaerde.service';
import { BellewaerdeTransferService } from './bellewaerde-transfer/bellewaerde-transfer.service';
import { BellewaerdeAquaparkService } from './bellewaerde-aquapark/bellewaerde-aquapark.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [BellewaerdeService, BellewaerdeTransferService, BellewaerdeAquaparkService],
  exports: [BellewaerdeService, BellewaerdeAquaparkService],
})
export class BellewaerdeModule {
}
