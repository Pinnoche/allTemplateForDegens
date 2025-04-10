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
  // Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DDataService } from './d-data.service';
import { CreateDDatumDto } from './dto/create-d-datum.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDDatumDto } from './dto/update-d-datum.dto';
// import { use } from 'passport';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  @Post('upload/:id')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    console.log(id);
    console.log(files);
    return await this.dDataService.uploadImages(id, files);
    return;
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
