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
      },
      select: ['id', 'slug', 'imageUrl', 'description', 'author', 'locale', 'parkId']
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
        slug: slug
      },
      select: {
        id: true,
        slug: true,
        locale: true,
        description: true,
        content: true,
        createdAt: true,
        author: {
          id: true,
          firstName: true
        }
      },
      relations: ['author']
    })
  }

  create(blogPost: BlogPostInsertEntity, user: User) {
    return this.blogPostRepository.insert({ ...blogPost, author: user });
  }
}
