import { Module } from '@nestjs/common';
import { TivoliService } from './tivoli.service';
import { TivoliTransferService } from './tivoli-transfer/tivoli-transfer.service';
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
    LocaleModule
  ],
  exports: [TivoliService],
  providers: [TivoliService, TivoliTransferService]
})
export class TivoliModule {}
