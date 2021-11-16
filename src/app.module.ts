import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './_services/app.service';
import { ThemeParkService } from './_services/themepark/theme-park.service';
import { ThroughPoisThemeParkService } from './_services/themepark/through-pois-theme-park.service';
import { ParksService } from './_services/parks/parks.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErrorService } from './_services/error/error.service';
import { AttractionsIoThemeParkService } from './_services/attractions-io-theme-park/attractions-io-theme-park.service';
import { TransferService } from './_services/transfer/transfer.service';
import { CompanyService } from './_services/company/company.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WaitTimeScheduleService } from './schedules/waittimes/wait-time-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitTime } from './database/wait-time/wait-time.entity';
import { WaitTimeModule } from './database/wait-time/wait-time.module';
import { ParksModule } from './parks/parks.module';
import { LegolandDeutschlandService } from './parks/legoland/legoland-deutschland/legoland-deutschland.service';
import { ControllersModule } from './controllers/controllers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
    CacheModule.register({
      ttl: 60 * 5,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // @ts-ignore
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DATABASE'),
        entities: [WaitTime],
        synchronize: true,
      }),
    }),
    WaitTimeModule,
    ParksModule,
    ControllersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ThemeParkService, ThroughPoisThemeParkService, ParksService, ErrorService, AttractionsIoThemeParkService, TransferService, CompanyService, WaitTimeScheduleService, LegolandDeutschlandService],
})
export class AppModule {
}
