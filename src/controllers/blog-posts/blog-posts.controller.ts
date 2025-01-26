import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post, Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BlogPostsService } from '../../database/blog-posts/blog-posts.service';
import { BlogPost } from '../../database/blog-posts/blog-post.entity';
import { BlogPostInsertEntity } from '../../database/blog-posts/dto/blog-post-insert.entity';
import { AuthGuard } from '@nestjs/passport';
import { LocaleService } from '../../_services/locale/locale.service';
import { LanguageInterceptor } from '../../_interceptors/language.interceptor';
import { BlogPostEditEntity } from '../../database/blog-posts/dto/blog-post-edit.entity';

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
  @ApiQuery({
    type: String,
    isArray: false,
    example: 'nl-NL',
    required: true,
    name: 'lang',
    description: 'For which locale should blog posts be returned'
  })
  @UseInterceptors(LanguageInterceptor)
  @Get('/')
  public getAllBlogPosts(@Param() params, @Request() req) {
    return this.blogPostService.getAll(this.localeService.getLocale());
  }

  // TODO: Should more information be cached?
  @ApiOkResponse({
    type: BlogPost,
    isArray: true,
  })
  @ApiParam({
    name: 'park_id',
    type: 'string',
    description: 'The park id for which to fetch all blog posts',
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
  @ApiParam({
    name: 'slug',
    type: 'string',
    description: 'The slug of the blog post',
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
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The blog post id',
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
  @ApiBearerAuth()
  @Post('/')
  public create(@Body() blogPost: BlogPostInsertEntity, @Request() req) {
    return this.blogPostService.create(blogPost, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The blog post id',
  })
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
  @ApiBearerAuth()
  @Put('/:id')
  public async update(@Param() params, @Body() blogPost: BlogPostEditEntity) {
    return this.blogPostService.update(params.id, blogPost);
  }
}
