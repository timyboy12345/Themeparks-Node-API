import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckinService } from '../../database/checkins/checkin.service';
import { CheckinInsertEntity } from '../../database/checkins/dto/checkin-insert.entity';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CheckinDto } from '../../_dtos/checkin.dto';

@ApiTags("Checkins")
@UseGuards(AuthGuard('jwt'))
@Controller('checkins')
export class CheckinsController {
  constructor(
    private checkinsService: CheckinService) {
  }

  @ApiOkResponse({
    type: CheckinDto,
    isArray: true,
  })
  @Get('')
  public getAllCheckins(@Request() req) {
    return this.checkinsService.getAll(req.user.id);
  }

  @ApiParam({
    name: 'parkId',
    type: 'string',
    description: 'The park id',
  })
  @ApiOkResponse({
    type: CheckinDto,
    isArray: true,
  })
  @Get('park/:parkId')
  public getAllCheckinsFromPark(@Request() req, @Param() params) {
    return this.checkinsService.getAllFromPark(req.user.id, params.parkId);
  }

  @Post('create')
  public create(@Body() checkin: CheckinInsertEntity, @Request() req) {
    return this.checkinsService.create(checkin, req.user);
  }
}
