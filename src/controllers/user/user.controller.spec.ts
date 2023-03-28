import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AuthService } from '../../auth/auth.service';
import { AuthModule } from '../../auth/auth.module';
import { UsersService } from '../../database/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WaitTime } from '../../database/wait-time/wait-time.entity';
import { Checkin } from '../../database/checkins/checkin.entity';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [AuthService, UsersService, JwtService],
      imports: [
        AuthModule,
        DatabaseModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          // @ts-ignore
          useFactory: async (configService: ConfigService) => ({
            type: configService.get('DATABASE_TYPE'),
            host: configService.get('DATABASE_HOST'),
            port: configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_DATABASE'),
            entities: [WaitTime, User, Checkin],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([WaitTime, User, Checkin]),
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
