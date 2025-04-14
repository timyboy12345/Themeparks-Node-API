import { Module } from '@nestjs/common';
import { HolidayParkService } from './holiday-park/holiday-park.service';
import { PlopsalandDePanneService } from './plopsaland-de-panne/plopsaland-de-panne.service';
import { PlopsaBaseService } from './plopsa-base/plopsa-base.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../_services/locale/locale.module';
import { PlopsaTransferService } from './plopsa-transfer/plopsa-transfer.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    LocaleModule,
  ],
  providers: [PlopsaBaseService, PlopsalandDePanneService, HolidayParkService, PlopsaTransferService],
  exports: [PlopsalandDePanneService, HolidayParkService],
})
export class PlopsaModule {
}
