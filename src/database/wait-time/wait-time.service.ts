import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { WaitTime } from './wait-time.entity';
import { DataSource, Repository } from 'typeorm';
import { WaitTimeInsertEntity } from './dto/wait-time-insert.entity';

@Injectable()
export class WaitTimeService {
  constructor(@InjectRepository(WaitTime) private waitTimeRepository: Repository<WaitTime>,
              @InjectDataSource() private readonly dataSource: DataSource) {
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
   * @deprecated use the findByParkIdAndDateRange
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
   * Get all wait times by park ID and date range
   * @param parkId Park ID as string or number
   * @param start Date as string (YYYY-MM-DD)
   * @param end Date as string (YYYY-MM-DD)
   */
  findByParkIdAndDateRange(parkId: string, start: string, end: string): Promise<WaitTime[]> {
    return this
      .waitTimeRepository
      .createQueryBuilder('wait_time')
      .where('wait_time.park_id = :park AND date > :start AND date < :end', {
        park: parkId,
        start,
        end
      })
      .getMany();
  }

  /**
   * Get all wait times by park ID and date range
   * @param parkId Park ID as string or number
   * @param start Date as string (YYYY-MM-DD)
   * @param end Date as string (YYYY-MM-DD)
   */
  findByParkIdAndWeekRange(parkId: string, start: string, end: string): Promise<WaitTime[]> {
    return this.dataSource.query("select ride_id, WEEKDAY(date) as 'day', hour(date) as 'hour', avg(wait) as 'average', min(wait) as 'min', max(wait) as 'max' from wait_time where date between ? and ? AND status = 'open' AND park_id = ? group by ride_id, WEEKDAY(date), hour(date) ORDER BY ride_id;", [
      start, end, parkId
    ])
  }

  /**
   * Get all wait times by park ID with a date greather then the given date
   * @param parkId Park ID as string or number
   * @param date Date as string (YYYY-MM-DD)
   */
  findByParkIdAndMinimumDate(parkId: string, date: string): Promise<WaitTime[]> {
    return this
      .waitTimeRepository
      .createQueryBuilder('wait_time')
      .where('wait_time.park_id = :park AND DATE(date) > :date', {
        park: parkId,
        date: date
      })
      .getMany();
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
