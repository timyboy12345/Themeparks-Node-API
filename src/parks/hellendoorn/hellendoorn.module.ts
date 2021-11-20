import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HellendoornService } from './hellendoorn.service';
import { AioTransferServiceService } from '../../_services/attractions-io-theme-park/transfer-service/aio-transfer-service.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [HellendoornService],
  providers: [HellendoornService, AioTransferServiceService],
})
export class HellendoornModule {
}
