import { Module } from '@nestjs/common';
import { HansaParkService } from './hansa-park.service';
import { HansaParkTransferService } from './hansa-park-transfer/hansa-park-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LocaleModule } from '../../_services/locale/locale.module';

@Module({
  providers: [HansaParkService, HansaParkTransferService],
  exports: [HansaParkService],
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
export class HansaParkModule {
}
