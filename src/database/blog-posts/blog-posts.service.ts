import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './blog-post.entity';
import { BlogPostInsertEntity } from './dto/blog-post-insert.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BlogPostsService {
  constructor(@InjectRepository(BlogPost) private blogPostRepository: Repository<BlogPost>) {
  }

  async getAll(locale: string) {
    return this.blogPostRepository.find({
      where: {
        locale: locale
      }
    });
  }

  async getAllForPark(locale: string, parkId: string) {
    return this.blogPostRepository.find({
      where: {
        locale: locale,
        parkId: parkId
      }
    });
  }

  async getBySlug(locale: string, slug: string) {
    return this.blogPostRepository.findOneOrFail({
      where: {
        locale: locale,
        slug: slug
      }
    })
  }

  create(blogPost: BlogPostInsertEntity, user: User) {
    return this.blogPostRepository.insert({ ...blogPost, author: user });
  }
}
