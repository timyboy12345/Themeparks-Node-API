import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HolidayParkService } from './holiday-park.service';
import { HolidayParkTransferService } from './holiday-park-transfer/holiday-park-transfer.service';
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
    LocaleModule
  ],
  providers: [HolidayParkService, HolidayParkTransferService],
  exports: [HolidayParkService],
})
export class HolidayParkModule {
}
