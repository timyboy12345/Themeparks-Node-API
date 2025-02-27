import { Test, TestingModule } from '@nestjs/testing';
import { PushController } from './push.controller';
import { PushModule } from '../../database/push/push.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../database/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../../auth/auth.module';
import { DatabaseModule } from '../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../database/users/user.entity';
import { Push } from '../../database/push/push.entity';

describe('PushService', () => {
  let service: PushController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PushController],
      providers: [PushController, AuthService, UsersService, JwtService],
      imports: [
        PushModule,
        CacheModule.register({ ttl: 0 }),
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
            entities: [User, Push],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([User, Push]),
      ],
    }).compile();

    service = module.get<PushController>(PushController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
