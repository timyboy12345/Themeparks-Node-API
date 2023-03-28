import { Module } from '@nestjs/common';
import { EftelingService } from './efteling.service';
import { EftelingTransferService } from './efteling-transfer/efteling-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../_services/locale/locale.module';
import { HttpModule } from '@nestjs/axios';

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
  providers: [EftelingService, EftelingTransferService],
  exports: [EftelingService]
})
export class EftelingModule {
}
