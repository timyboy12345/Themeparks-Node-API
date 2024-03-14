import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkin } from './checkin.entity';
import { CheckinInsertInterface } from './dto/checkin-insert.interface';
import { User } from '../users/user.entity';

@Injectable()
export class CheckinService {
  constructor(@InjectRepository(Checkin) private checkinRepository: Repository<Checkin>) {
  }

  async getAll(u: User) {
    return this.checkinRepository.find({
      where: {
        user: u,
      },
    });
  }

  // async getAllFromPark(id: string, parkId: string) {
  //   return this.checkinRepository.find({
  //     where: {
  //       user: id,
  //       parkId: parkId,
  //     },
  //   });
  // }

  async create(checkin: CheckinInsertInterface, user: User) {
    return this.checkinRepository.insert({ ...checkin, user: user });
  }

  async read(checkinId: number, user: User) {
    return this.checkinRepository.findOne({
      where: {
        id: checkinId,
        user: user,
      },
    });
  }

  async update(id: number, updatedData: CheckinInsertInterface, user: User) {
    const checkin = await this.read(id, user);

    if (!checkin) {
      throw new HttpException('Checkin not found', 404, {
        cause: new Error('Checkin not found'),
      });
    }

    return await this.checkinRepository.update(id, updatedData);
  }

  async delete(id: number, user: User) {
    const checkin = await this.read(id, user);

    if (checkin) {
      return await this.checkinRepository.delete(id);
    } else {
      throw new HttpException('Checkin not found', 404, {
        cause: new Error('Checkin not found'),
      });
    }
  }
}
