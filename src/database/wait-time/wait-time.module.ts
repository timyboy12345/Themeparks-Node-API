import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitTime } from './wait-time.entity';
import { WaitTimeService } from './wait-time.service';

@Module({
  imports: [TypeOrmModule.forFeature([WaitTime])],
  exports: [WaitTimeService],
  providers: [WaitTimeService],
})
export class WaitTimeModule {
}
