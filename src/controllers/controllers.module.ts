import { Logger, Module } from '@nestjs/common';
import { ParksController } from './parks/parks.controller';
import { ParksService } from '../_services/parks/parks.service';
import { ConfigModule } from '@nestjs/config';
import { ParksModule } from '../parks/parks.module';
import { ParkController } from './park/park.controller';
import { DatabaseModule } from '../database/database.module';
import { ParkHistoryController } from './park-history/park-history.controller';
import { LocaleModule } from '../_services/locale/locale.module';
import { UserController } from './user/user.controller';
import { AuthModule } from '../auth/auth.module';
import { CheckinsController } from './checkins/checkins.controller';
import { HttpModule } from '@nestjs/axios';
import { BlogPostsController } from './blog-posts/blog-posts.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { PushController } from './push/push.controller';

@Module({
  controllers: [ParksController, ParkController, ParkHistoryController, UserController, CheckinsController, BlogPostsController, PushController],
  imports: [
    CacheModule.register({
      ttl: 1000 * 5 * 60,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
    HttpModule,
    ParksModule,
    DatabaseModule,
    LocaleModule,
    AuthModule,
  ],
  providers: [
    ParksService,
    Logger,
  ],
})
export class ControllersModule {
}
