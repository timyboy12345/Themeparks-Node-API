import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './_services/app.service';
import { ThemeParkService } from './_services/themepark/theme-park.service';
import { ThroughPoisThemeParkService } from './_services/themepark/through-pois-theme-park.service';
import { ParksService } from './_services/parks/parks.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErrorService } from './_services/error/error.service';
import { AioThemeparkService } from './_services/aio/aio-themepark.service';
import { TransferService } from './_services/transfer/transfer.service';
import { CompanyService } from './_services/company/company.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WaitTimeScheduleService } from './schedules/waittimes/wait-time-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitTime } from './database/wait-time/wait-time.entity';
import { WaitTimeModule } from './database/wait-time/wait-time.module';
import { ParksModule } from './parks/parks.module';
import { ControllersModule } from './controllers/controllers.module';
import { DatabaseModule } from './database/database.module';
import { AioTransferServiceService } from './_services/aio/transfer-service/aio-transfer-service.service';
import { LocaleModule } from './_services/locale/locale.module';
import { AuthModule } from './auth/auth.module';
import { User } from './database/users/user.entity';
import { Checkin } from './database/checkins/checkin.entity';
import { HttpModule } from '@nestjs/axios';
import { BlogPost } from './database/blog-posts/blog-post.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { Push } from './database/push/push.entity';
import { NotificationsService } from './_services/notifications/notifications.service';
import { DailyAnalysisService } from './schedules/daily-analysis/daily-analysis.service';

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
        entities: [WaitTime, User, Checkin, BlogPost, Push],
        synchronize: true,
      }),
    }),
    WaitTimeModule,
    ParksModule,
    ControllersModule,
    DatabaseModule,
    LocaleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ThemeParkService,
    ThroughPoisThemeParkService,
    ParksService,
    ErrorService,
    AioThemeparkService,
    TransferService,
    CompanyService,
    WaitTimeScheduleService,
    AioTransferServiceService,
    NotificationsService,
    DailyAnalysisService,
  ],
})
export class AppModule {
}
