import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserInsertDto {
  @ApiProperty({
    required: true,
    description: "The username of this user"
  })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    required: true,
    description: "The email of this user"
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: "The first name of this user"
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    description: "The last name of this user"
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    required: true,
    description: "The password of this user, will be encrypted on the server"
  })
  @IsNotEmpty()
  password: string;
}
