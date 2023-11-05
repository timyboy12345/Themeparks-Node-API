import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from '../../database/blog-posts/blog-posts.service';
import { DatabaseModule } from '../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../database/users/user.entity';
import { BlogPost } from '../../database/blog-posts/blog-post.entity';
import { WaitTime } from '../../database/wait-time/wait-time.entity';
import { Checkin } from '../../database/checkins/checkin.entity';
import { AuthModule } from '../../auth/auth.module';
import { LocaleModule } from '../../_services/locale/locale.module';

describe('BlogPostsController', () => {
  let controller: BlogPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostsController],
      providers: [BlogPostsService],
      imports: [
        AuthModule,
        DatabaseModule,
        LocaleModule,
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

    controller = module.get<BlogPostsController>(BlogPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
