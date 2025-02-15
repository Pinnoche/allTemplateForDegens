import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { DDataService } from './d-data.service';
import { CreateDDatumDto } from './dto/create-d-datum.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDDatumDto } from './dto/update-d-datum.dto';

@Controller('data')
export class DDataController {
  constructor(private readonly dDataService: DDataService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createDDatumDto: CreateDDatumDto,
    @Req() req,
  ): Promise<any> {
    return this.dDataService.create(createDDatumDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllData() {
    return this.dDataService.getDatum();
  }

  @Get()
  async getDataBySubdomain(@Req() req): Promise<any> {
    return await this.dDataService.getBySubdomain(req.user);
  }

  @Get(':id')
  async getDataById(@Param('id') id: string) {
    return this.dDataService.getData(id);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  async getUserData(@Req() req): Promise<any> {
    return await this.dDataService.getDataByUserId(req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDDatumDto: UpdateDDatumDto,
  ): Promise<any> {
    return this.dDataService.update(id, updateDDatumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return await this.dDataService.remove(id);
  }
}
