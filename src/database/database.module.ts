import { Module } from '@nestjs/common';
import { WaitTimeService } from './wait-time/wait-time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitTime } from './wait-time/wait-time.entity';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { CheckinService } from './checkins/checkin.service';
import { Checkin } from './checkins/checkin.entity';
import { BlogPost } from './blog-posts/blog-post.entity';
import { BlogPostsService } from './blog-posts/blog-posts.service';
import { Push } from './push/push.entity';
import { PushService } from './push/push.service';

@Module({
  imports: [TypeOrmModule.forFeature([WaitTime, User, Checkin, BlogPost, Push])],
  providers: [WaitTimeService, UsersService, CheckinService, BlogPostsService, PushService],
  exports: [WaitTimeService, UsersService, CheckinService, BlogPostsService, PushService]
})
export class DatabaseModule {
}
