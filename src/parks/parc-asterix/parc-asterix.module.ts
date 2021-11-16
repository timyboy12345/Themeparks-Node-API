import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ParcAsterixService } from './parc-asterix.service';
import { ParcAsterixTransferService } from './parc-asterix-transfer/parc-asterix-transfer.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [ParcAsterixService, ParcAsterixTransferService],
  exports: [ParcAsterixService],
})
export class ParcAsterixModule {
}
