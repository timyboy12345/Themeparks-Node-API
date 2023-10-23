import { Body, Controller, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { BlogPostsService } from '../../database/blog-posts/blog-posts.service';
import { BlogPost } from '../../database/blog-posts/blog-post.entity';
import { BlogPostInsertEntity } from '../../database/blog-posts/dto/blog-post-insert.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Blog Posts")
@Controller('blog-posts')
export class BlogPostsController {
  constructor(
    private blogPostService: BlogPostsService) {
  }

  @ApiOkResponse({
    type: BlogPost,
    isArray: true,
  })
  @Get(':locale')
  public getAllCheckins(@Param() params, @Request() req) {
    return this.blogPostService.getAll(params.locale);
  }

  @ApiOkResponse({
    type: BlogPost,
    isArray: true,
  })
  @Get('/:locale/parks/:park_id')
  public getAllCheckinsForPark(@Param() params, @Request() req) {
    return this.blogPostService.getAllForPark(params.locale, params.park_id);
  }

  @ApiOkResponse({
    type: BlogPost,
    isArray: false,
  })
  @Get('/:locale/:slug')
  public getBySlug(@Param() params, @Request() req) {
    return this.blogPostService.getBySlug(params.locale, params.slug)
      .then((res) => res)
      .catch(() => {
        throw new NotFoundException("No blog posts with this slug found");
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'The slug of this post, should be in the locale of this post'
  })
  @ApiParam({
    name: 'locale',
    type: String,
    example: 'nl-NL',
    description: 'The locale code of the blog post'
  })
  @ApiParam({
    name: 'description',
    type: String,
    description: 'The description of this blog post'
  })
  @ApiParam({
    name: 'content',
    type: String,
    description: 'The content of this blog post, in markdown format'
  })
  @ApiParam({
    name: 'parkId',
    type: String,
    description: 'The ID of the park'
  })
  @ApiParam({
    name: 'imageUrl',
    type: String,
    required: false,
    description: 'A link to a image that fits this blog post'
  })
  @ApiOkResponse({
    type: BlogPost
  })
  @Post('/')
  public create(@Body() blogPost: BlogPostInsertEntity, @Request() req) {
    return this.blogPostService.create(blogPost, req.user);
  }
}
