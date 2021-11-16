import { Module } from '@nestjs/common';
import { WaitTimeService } from './wait-time/wait-time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitTime } from './wait-time/wait-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaitTime])],
  providers: [WaitTimeService],
  exports: [WaitTimeService]
})
export class DatabaseModule {
}
