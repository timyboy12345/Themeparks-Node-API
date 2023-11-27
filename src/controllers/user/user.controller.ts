import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../database/users/users.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserInsertDto } from '../../database/users/dto/user-insert.dto';
import { UserLoginDto } from '../../database/users/dto/user-login.dto';

@Controller('auth')
@ApiTags("Authentication")
export class UserController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService) {
  }

  @Post('register')
  async register(@Body() body: UserInsertDto) {
    return this.usersService.create(
      body.email,
      body.userName,
      body.firstName,
      body.lastName,
      body.password
    );
  }

  @UseGuards(AuthGuard('local'))
  @ApiBody({
    type: UserLoginDto,
  })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get the value of a JWT token'})
  @Get('jwt')
  getJWT(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get all details for a logged in user'})
  @Get('user')
  getUser(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }
}
