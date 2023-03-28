import { Module } from '@nestjs/common';
import { WaitTimeService } from './wait-time/wait-time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitTime } from './wait-time/wait-time.entity';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { CheckinService } from './checkins/checkin.service';
import { Checkin } from './checkins/checkin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaitTime, User, Checkin])],
  providers: [WaitTimeService, UsersService, CheckinService],
  exports: [WaitTimeService, UsersService, CheckinService]
})
export class DatabaseModule {
}
