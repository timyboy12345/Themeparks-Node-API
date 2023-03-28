import { ApiProperty } from '@nestjs/swagger';

export class UserInsertDto {
  @ApiProperty({
    required: true,
    description: "The username of this user"
  })
  userName: string;

  @ApiProperty({
    required: true,
    description: "The email of this user"
  })
  email: string;

  @ApiProperty({
    required: true,
    description: "The first name of this user"
  })
  firstName: string;

  @ApiProperty({
    required: true,
    description: "The last name of this user"
  })
  lastName: string;

  @ApiProperty({
    required: true,
    description: "The password of this user, will be encrypted on the server"
  })
  password: string;
}
