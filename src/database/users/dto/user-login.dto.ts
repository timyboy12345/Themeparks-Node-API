import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'test'
  })
  email: string

  @IsString()
  @ApiProperty({
    type: String,
    example: 'password'
  })
  password: string
}
