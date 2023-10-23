import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, userName: string, firstName: string, lastName: string, password: string): Promise<any> {
    return this.usersRepository.insert({
      email: email,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
      isActive: true
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(userId: number): Promise<User | null> {
    return this.usersRepository.findOneOrFail({
      where: {
        id: userId
      }
    })
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
      select: ['id', 'email', 'userName', 'password']
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
