import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  // Request,
} from '@nestjs/common';
import { DDataService } from './d-data.service';
import { CreateDDatumDto } from './dto/create-d-datum.dto';
import { AuthGuard } from '@nestjs/passport';
// import { UpdateDDatumDto } from './dto/update-d-datum.dto';

@Controller('data')
export class DDataController {
  constructor(private readonly dDataService: DDataService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createDDatumDto: CreateDDatumDto,
    @Req() req,
  ): Promise<any> {
    return this.dDataService.create(createDDatumDto, req.user);
  }

  @Get()
  getAllData() {
    return this.dDataService.getDatum();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dDataService.findOne(+id);
  // }

  @Get('user')
  @UseGuards(AuthGuard())
  async getUserData(@Req() req): Promise<any> {
    return await this.dDataService.getDataByUserId(req.user);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDDatumDto: UpdateDDatumDto) {
  //   return this.dDataService.update(+id, updateDDatumDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dDataService.remove(+id);
  }
}
