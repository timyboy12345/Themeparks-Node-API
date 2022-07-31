import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WaitTime } from './wait-time.entity';
import { Repository } from 'typeorm';
import { WaitTimeInsertEntity } from './dto/wait-time-insert.entity';

@Injectable()
export class WaitTimeService {
  constructor(@InjectRepository(WaitTime) private waitTimeRepository: Repository<WaitTime>) {
  }

  /**
   * Get all wait times (Heavy)
   * @deprecated
   */
  findAll(): Promise<WaitTime[]> {
    return this.waitTimeRepository.find();
  }

  /**
   * Get all wait times by ride ID
   * @param rideId
   */
  findByRideId(rideId: string): Promise<WaitTime> {
    return this.waitTimeRepository.findOne({
      where: {
        ride_id: rideId,
      },
    });
  }

  /**
   * Get all wait times by park ID
   * @param parkId
   */
  findByParkId(parkId: string): Promise<WaitTime[]> {
    return this.waitTimeRepository.find({
      where: {
        park_id: parkId,
      },
    });
  }

  /**
   * Get all wait times by park ID and date
   * @param parkId Park ID as string or number
   * @param date Date as string (YYYY-MM-DD)
   */
  findByParkIdAndDate(parkId: string, date: string): Promise<WaitTime[]> {
    return this
      .waitTimeRepository
      .createQueryBuilder('wait_time')
      .where('wait_time.park_id = :park AND DATE(date) = :date', {
        park: parkId,
        date: date
      })
      .getMany();
  }

  /**
   * Get a specific wait time (by ID)
   * @param id
   */
  findOne(id: string): Promise<WaitTime> {
    return this.waitTimeRepository.findOne(id);
  }

  /**
   * Remove a wait time by ID
   * @param id
   */
  async remove(id: string): Promise<void> {
    await this.waitTimeRepository.delete(id);
  }

  /**
   * Insert a new wait time
   * @param waitTime
   */
  async insert(waitTime: WaitTimeInsertEntity) {
    return await this.waitTimeRepository.insert({
      ride_id: waitTime.ride_id,
      park_id: waitTime.park_id,
      status: waitTime.status,
      wait: waitTime.wait,
      date: waitTime.date,
    });
  }
}
