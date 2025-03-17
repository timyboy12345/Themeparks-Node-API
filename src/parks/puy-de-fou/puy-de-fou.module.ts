import { Module } from '@nestjs/common';
import { PuyDeFouService } from './puy-de-fou.service';
import { PuyDeFouFranceService } from './puy-de-fou-france/puy-de-fou-france.service';
import { PuyDeFouGeneralService } from './puy-de-fou-general/puy-de-fou-general.service';
import { HttpModule } from '@nestjs/axios';
import { LocaleModule } from '../../_services/locale/locale.module';
import { ConfigModule } from '@nestjs/config';
import { PuyDeFouTransferService } from './puy-de-fou-transfer/puy-de-fou-transfer.service';

@Module({
  providers: [PuyDeFouService, PuyDeFouFranceService, PuyDeFouGeneralService, PuyDeFouTransferService],
  exports: [PuyDeFouService],
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
export class PuyDeFouModule {
}
