import { Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkin } from './checkin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin])],
  exports: [CheckinService],
  providers: [CheckinService]
})
export class CheckinsModule {}
