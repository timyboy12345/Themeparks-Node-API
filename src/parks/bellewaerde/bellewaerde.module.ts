import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BellewaerdeService } from './bellewaerde.service';
import { BellewaerdeTransferService } from './bellewaerde-transfer/bellewaerde-transfer.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [BellewaerdeService, BellewaerdeTransferService],
  exports: [BellewaerdeService],
})
export class BellewaerdeModule {
}
