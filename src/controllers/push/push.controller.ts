import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PushService } from '../../database/push/push.service';
import { PushInsertDto } from '../../database/push/dto/push-insert.dto';
import { PushDto } from '../../_dtos/push.dto';

@ApiTags('Push')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('push')
export class PushController {
  constructor(
    private pushService: PushService) {
  }

  @ApiOkResponse({
    type: PushDto,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all push message requests for a specific user' })
  @Get('')
  public getAllPushes(@Request() req) {
    return this.pushService.getAll(req.user);
  }

  @ApiBody({
    type: PushInsertDto,
  })
  @ApiOperation({ summary: 'Create a push message request for a specific park, poi and user' })
  @Post('')
  public create(@Body() push: PushInsertDto, @Request() req) {
    return this.pushService.create(push, req.user);
  }
}
