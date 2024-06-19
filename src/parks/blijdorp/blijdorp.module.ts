import { Module } from '@nestjs/common';
import { BlijdorpService } from './blijdorp/blijdorp.service';
import { BlijdorpTransferService } from './blijdorp-transfer/blijdorp-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LocaleModule } from '../../_services/locale/locale.module';

@Module({
  imports: [
    HttpModule,
    LocaleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [BlijdorpService, BlijdorpTransferService],
  exports: [BlijdorpService]
})
export class BlijdorpModule {

}
