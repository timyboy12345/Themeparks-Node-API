import { HttpModule, Module } from '@nestjs/common';
import { HansaParkService } from './hansa-park.service';
import { HansaParkTransferService } from './hansa-park-transfer/hansa-park-transfer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [HansaParkService, HansaParkTransferService],
  exports: [HansaParkService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
})
export class HansaParkModule {
}
