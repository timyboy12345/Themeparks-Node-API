import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../database/users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserInsertDto } from '../../database/users/dto/user-insert.dto';

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
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('jwt')
  getJWT(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUser(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }
}
