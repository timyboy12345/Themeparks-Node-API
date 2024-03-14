import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckinService } from '../../database/checkins/checkin.service';
import { CheckinInsertInterface } from '../../database/checkins/dto/checkin-insert.interface';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CheckinDto } from '../../_dtos/checkin.dto';
import { Checkin } from '../../database/checkins/checkin.entity';
import { CheckinInsertDto } from '../../database/checkins/dto/checkin-insert.dto';

@ApiTags('Checkins')
@ApiBearerAuth()
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
  @ApiOperation({ summary: 'Get all checkins for a specific user' })
  @Get('')
  public getAllCheckins(@Request() req) {
    return this.checkinsService.getAll(req.user);
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


  @ApiBody({
    type: CheckinInsertDto,
  })
  @ApiOperation({ summary: 'Create a checkin for a specific park, ride and user' })
  @Post('')
  public create(@Body() checkin: CheckinInsertInterface, @Request() req) {
    return this.checkinsService.create(checkin, req.user);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The id of the checkin',
  })
  @ApiOperation({
    summary: 'Get a specific checkin by id, can only fetch checkins for the logged in user',
    description: 'You can only fetch checkins for the logged in user, any checkins that may (or may not) exist but are not coupled to the given user will give a 404.',
  })
  @ApiOkResponse({
    type: Checkin,
    isArray: false,
  })
  @Get('/:id')
  public read(@Param() params, @Request() req) {
    return this.checkinsService.read(params.id, req.user);
  }

  @ApiOperation({ summary: 'Update a specific checkin' })
  @ApiBody({
    type: CheckinInsertDto,
  })
  @Put('/:id')
  public update(@Param() params, @Body() checkin: CheckinInsertInterface, @Request() req) {
    return this.checkinsService.update(params.id, checkin, req.user);
  }


  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The id of the checkin to delete',
  })
  @ApiOperation({ summary: 'Delete a specific checkin' })
  @Delete('/:id')
  public delete(@Param() params, @Request() req) {
    return this.checkinsService.delete(params.id, req.user);
  }
}
