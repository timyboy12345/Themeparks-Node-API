import { Test, TestingModule } from '@nestjs/testing';
import { CheckinsController } from './checkins.controller';
import { AuthModule } from '../../auth/auth.module';
import { DatabaseModule } from '../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WaitTime } from '../../database/wait-time/wait-time.entity';
import { User } from '../../database/users/user.entity';
import { Checkin } from '../../database/checkins/checkin.entity';
import { CheckinService } from '../../database/checkins/checkin.service';
import { BlogPost } from '../../database/blog-posts/blog-post.entity';

describe('CheckinsController', () => {
  let controller: CheckinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckinService],
      controllers: [CheckinsController],
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
            entities: [BlogPost, WaitTime, User, Checkin],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([BlogPost, WaitTime, User, Checkin]),
      ],
    }).compile();

    controller = module.get<CheckinsController>(CheckinsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
