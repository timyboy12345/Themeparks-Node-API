import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Push } from './push.entity';
import { User } from '../users/user.entity';
import { PushInsert } from './dto/push.interface';

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

  async create(push: PushInsert, user: User) {
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

  async delete(id: number, user: User) {
    const checkin = await this.read(id, user);

    if (checkin) {
      return await this.pushRepository.delete(id);
    } else {
      throw new HttpException('Push Message not found', 404, {
        cause: new Error('Push Message not found'),
      });
    }
  }
}
