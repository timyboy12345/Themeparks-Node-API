import { Module } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './blog-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  exports: [BlogPostsService],
  providers: [BlogPostsService]
})
export class BlogPostsModule {}
