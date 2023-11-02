import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { BlogPostsService } from '../../database/blog-posts/blog-posts.service';
import { BlogPost } from '../../database/blog-posts/blog-post.entity';
import { BlogPostInsertEntity } from '../../database/blog-posts/dto/blog-post-insert.entity';
import { AuthGuard } from '@nestjs/passport';
import { LocaleService } from '../../_services/locale/locale.service';
import { LanguageInterceptor } from '../../_interceptors/language.interceptor';

@ApiTags('Blog Posts')
@Controller('blog-posts')
export class BlogPostsController {
  constructor(
    private blogPostService: BlogPostsService,
    private localeService: LocaleService) {
  }

  @ApiOkResponse({
    type: BlogPost,
    isArray: true,
  })
  @UseInterceptors(LanguageInterceptor)
  @Get('/')
  public getAllBlogPosts(@Param() params, @Request() req) {
    return this.blogPostService.getAll(this.localeService.getLocale());
  }

  @ApiOkResponse({
    type: BlogPost,
    isArray: true,
  })
  @UseInterceptors(LanguageInterceptor)
  @Get('/parks/:park_id')
  public getAllCheckinsForPark(@Param() params, @Request() req) {
    return this.blogPostService.getAllForPark(this.localeService.getLocale(), params.park_id);
  }

  @ApiOkResponse({
    type: BlogPost,
    isArray: false,
  })
  @UseInterceptors(LanguageInterceptor)
  @Get('/slug/:slug')
  public getBySlug(@Param() params, @Request() req) {
    return this.blogPostService.getBySlug(this.localeService.getLocale(), params.slug)
      .then((res) => res)
      .catch(() => {
        throw new NotFoundException('No blog posts with slug \'' + params.slug + '\' found');
      });
  }

  @ApiOkResponse({
    type: BlogPost,
    isArray: false,
  })
  @UseInterceptors(LanguageInterceptor)
  @Get('/:id')
  public getById(@Param() params, @Request() req) {
    return this.blogPostService.find(params.id)
      .then((res) => res)
      .catch(() => {
        throw new NotFoundException('No blog posts with id \'' + params.id + '\' found');
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'The slug of this post, should be in the locale of this post',
  })
  @ApiParam({
    name: 'locale',
    type: String,
    example: 'nl',
    description: 'The locale code of the blog post',
  })
  @ApiParam({
    name: 'description',
    type: String,
    description: 'The description of this blog post',
  })
  @ApiParam({
    name: 'content',
    type: String,
    description: 'The content of this blog post, in markdown format',
  })
  @ApiParam({
    name: 'parkId',
    type: String,
    description: 'The ID of the park',
  })
  @ApiParam({
    name: 'imageUrl',
    type: String,
    required: false,
    description: 'A link to a image that fits this blog post',
  })
  @ApiOkResponse({
    type: BlogPost,
  })
  @Post('/')
  public create(@Body() blogPost: BlogPostInsertEntity, @Request() req) {
    return this.blogPostService.create(blogPost, req.user);
  }
}
