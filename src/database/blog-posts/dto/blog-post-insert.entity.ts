import { IsLowercase, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BlogPostInsertEntity {
  @IsString()
  @ApiProperty()
  locale: string

  @IsString()
  @IsLowercase()
  @ApiProperty()
  slug: string

  @IsString()
  @ApiProperty()
  title: string

  @IsString()
  @ApiProperty()
  description: string

  @IsString()
  @ApiProperty()
  content: string

  @IsString()
  @ApiProperty()
  parkId: string

  @IsString()
  @IsUrl()
  @ApiProperty()
  imageUrl: string
}
