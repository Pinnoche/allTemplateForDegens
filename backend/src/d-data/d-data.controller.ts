import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DDataService } from './d-data.service';
import { CreateDDatumDto } from './dto/create-d-datum.dto';
import { UpdateDDatumDto } from './dto/update-d-datum.dto';

@Controller('d-data')
export class DDataController {
  constructor(private readonly dDataService: DDataService) {}

  @Post()
  create(@Body() createDDatumDto: CreateDDatumDto) {
    return this.dDataService.create(createDDatumDto);
  }

  @Get()
  findAll() {
    return this.dDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDDatumDto: UpdateDDatumDto) {
    return this.dDataService.update(+id, updateDDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dDataService.remove(+id);
  }
}
