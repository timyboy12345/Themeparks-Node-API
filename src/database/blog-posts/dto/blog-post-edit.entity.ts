import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BlogPostEditEntity {
  @IsOptional()
  @IsString()
  @ApiProperty()
  locale: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  slug: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  content: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  parkId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  imageUrl: string;
}
