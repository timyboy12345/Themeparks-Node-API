import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Push } from './push.entity';
import { User } from '../users/user.entity';
import { PushInsertDto } from './dto/push-insert.dto';
import { PushUpdateDto } from './dto/push-update.dto';

@Injectable()
export class PushService {
  constructor(@InjectRepository(Push) private pushRepository: Repository<Push>) {
  }

  async getAll(u: User) {
    return this.pushRepository.find({
      where: {
        user: u,
      },
    });
  }

  async getAllForParkAndPoi(parkId: string, poiId: string) {
    return this.pushRepository.find({
      where: {
        poiId,
        parkId,
      },
      relations: ['user'],
    });
  }

  async create(push: PushInsertDto, user: User) {
    return this.pushRepository.insert({ ...push, user: user });
  }

  async read(pushId: number, user: User) {
    return this.pushRepository.findOne({
      where: {
        id: pushId,
        user: user,
      },
    });
  }

  async update(id: number, push: PushUpdateDto) {
    return this.pushRepository.update(id, push)
  }

  async delete(id: number, user: User) {
    const push = await this.read(id, user);

    if (push) {
      return await this.pushRepository.delete(id);
    } else {
      throw new HttpException('Push Message not found', 404, {
        cause: new Error('Push Message not found'),
      });
    }
  }
}
