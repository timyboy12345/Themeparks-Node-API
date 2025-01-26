import { Module } from '@nestjs/common';
import { PairiDaizaService } from './pairi-daiza.service';
import { PairiDaizaTransferService } from './pairi-daiza-transfer/pairi-daiza-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../_services/locale/locale.module';

@Module({
  exports: [PairiDaizaService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
    LocaleModule,
  ],
  providers: [PairiDaizaService, PairiDaizaTransferService],
})
export class PairiDaizaModule {}
