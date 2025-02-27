import { Module } from '@nestjs/common';
import { FamilyparkService } from './familypark/familypark.service';
import { FamilyparkTransferService } from './familypark-transfer/familypark-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../_services/locale/locale.module';

@Module({
  providers: [FamilyparkService, FamilyparkTransferService],
  exports: [FamilyparkService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
    LocaleModule,
  ]
})
export class FamilyparkModule {}
