import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ParcAsterixService } from './parc-asterix.service';
import { ParcAsterixTransferService } from './parc-asterix-transfer/parc-asterix-transfer.service';
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
    LocaleModule,
  ],
  providers: [ParcAsterixService, ParcAsterixTransferService, Logger],
  exports: [ParcAsterixService],
})
export class ParcAsterixModule {
}
