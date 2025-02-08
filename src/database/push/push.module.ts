import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Push } from './push.entity';
import { CheckinService } from '../checkins/checkin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Push])],
  exports: [CheckinService],
  providers: [PushService]
})
export class PushModule {}
