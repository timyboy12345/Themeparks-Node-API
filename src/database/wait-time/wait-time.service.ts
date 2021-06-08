import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WaitTime } from './wait-time.entity';
import { Repository } from 'typeorm';
import { WaitTimeInsertEntity } from './dto/wait-time-insert.entity';

@Injectable()
export class WaitTimeService {
  constructor(
    @InjectRepository(WaitTime)
    private waitTimeRepository: Repository<WaitTime>,
  ) {
  }

  findAll(): Promise<WaitTime[]> {
    return this.waitTimeRepository.find();
  }

  findByRideId(rideId: string): Promise<WaitTime> {
    return this.waitTimeRepository.findOne({
      where: {
        ride_id: rideId,
      },
    });
  }

  findOne(id: string): Promise<WaitTime> {
    return this.waitTimeRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.waitTimeRepository.delete(id);
  }

  async insert(waitTime: WaitTimeInsertEntity) {
    return await this.waitTimeRepository.insert({
      ride_id: waitTime.ride_id,
      park_id: waitTime.park_id,
      status: waitTime.status,
      wait: waitTime.wait
    })
  }
}
