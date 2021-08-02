import { HttpModule, Module } from '@nestjs/common';
import { EftelingService } from './efteling.service';
import { EftelingTransferService } from './efteling-transfer/efteling-transfer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [EftelingService, EftelingTransferService],
  exports: [EftelingService]
})
export class EftelingModule {
}
