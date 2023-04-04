import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckinService } from '../../database/checkins/checkin.service';
import { CheckinInsertEntity } from '../../database/checkins/dto/checkin-insert.entity';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CheckinDto } from '../../_dtos/checkin.dto';
import { Checkin } from '../../database/checkins/checkin.entity';

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

  // @ApiParam({
  //   name: 'parkId',
  //   type: 'string',
  //   description: 'The park id',
  // })
  // @ApiOkResponse({
  //   type: CheckinDto,
  //   isArray: true,
  // })
  // @Get('park/:parkId')
  // public getAllCheckinsFromPark(@Request() req, @Param() params) {
  //   return this.checkinsService.getAllFromPark(req.user.id, params.parkId);
  // }

  @Post('')
  public create(@Body() checkin: CheckinInsertEntity, @Request() req) {
    return this.checkinsService.create(checkin, req.user);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The id of the checkin',
  })
  @ApiOkResponse({
    type: Checkin,
    isArray: false,
  })
  @Get('/:id')
  public read(@Param() params, @Request() req) {
    return this.checkinsService.read(params.id, req.user);
  }

  @Put('/:id')
  public update(@Param() params, @Body() checkin: CheckinInsertEntity, @Request() req) {
    return this.checkinsService.update(params.id, checkin, req.user);
  }

  @Delete('/:id')
  public delete(@Param() params, @Request() req) {
    return this.checkinsService.delete(params.id, req.user);
  }
}
