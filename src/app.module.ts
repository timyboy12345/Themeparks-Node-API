import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EftelingService } from './efteling/efteling.service';
import { ThemeparkService } from './_services/themepark/themepark.service';
import { ParksService } from './_services/parks/parks.service';
import { ToverlandService } from './toverland/toverland.service';
import { ConfigModule } from '@nestjs/config';
import { WalibiHollandService } from './walibi/holland/walibi-holland.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EftelingService, ThemeparkService, ParksService, ToverlandService, WalibiHollandService],
})
export class AppModule {
}
