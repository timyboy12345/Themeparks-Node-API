import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkin } from './checkin.entity';
import { CheckinInsertEntity } from './dto/checkin-insert.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CheckinService {
  constructor(@InjectRepository(Checkin) private checkinRepository: Repository<Checkin>) {
  }

  async getAll(id: string) {
    return this.checkinRepository.find({
      where: {
        user: id,
      },
    });
  }

  async getAllFromPark(id: string, parkId: string) {
    return this.checkinRepository.find({
      where: {
        user: id,
        parkId: parkId
      },
    });
  }

  async create(checkin: CheckinInsertEntity, user: User) {
    return this.checkinRepository.insert({ ...checkin, user: user });
  }
}
