import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EftelingService } from './efteling/efteling.service';
import { ThemeparkService } from './services/themepark/themepark.service';
import { ParksService } from './services/parks/parks.service';
import { ToverlandService } from './toverland/toverland.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, EftelingService, ThemeparkService, ParksService, ToverlandService],
})
export class AppModule {
}
