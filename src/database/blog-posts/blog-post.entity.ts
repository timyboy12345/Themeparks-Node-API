import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity()
export class BlogPost {
  @ApiProperty({
    description: "The automatically assigned ID of the blog post"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "The date this blog post was created"
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: "The locale of this blog post"
  })
  @Column()
  locale: string;

  @ApiProperty({
    description: "The slug of the blog post, in the specified locale"
  })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({
    description: "The description of the blog post, SEO-optimized"
  })
  @Column()
  description: string;

  @ApiProperty({
    description: "The content of the blog post, in markdown"
  })
  @Column({ type: 'longtext' })
  content: string;

  @ApiProperty({
    description: "A park ID, if the blog post is attached to a specific theme park"
  })
  @Column({ nullable: true })
  parkId: string;

  @ApiProperty({
    description: "The image of the blog post, possible from another domain"
  })
  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(type => User)
  author: User;
}
