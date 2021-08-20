import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HolidayParkService } from './holiday-park.service';
import { HolidayParkTransferService } from './holiday-park-transfer/holiday-park-transfer.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [HolidayParkService, HolidayParkTransferService],
  exports: [HolidayParkService],
})
export class HolidayParkModule {
}
