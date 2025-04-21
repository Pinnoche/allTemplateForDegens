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
  ParseFilePipeBuilder,
  HttpStatus,
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
  @UseGuards(AuthGuard('jwt'))
  async getDataById(@Param('id') id: string) {
    return this.dDataService.getData(id);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async getUserData(@Req() req): Promise<any> {
    return await this.dDataService.getDataByUserId(req.user);
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    // @Param('id') id: string,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 5024,
          message: 'File size must be less than 5MB',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    return await this.dDataService.uploadImages(files);
  }

  @Delete('image/delete/:files')
  @UseGuards(AuthGuard('jwt'))
  async deleteImages(@Param('files') files: string): Promise<any> {
    return await this.dDataService.deleteImages(files);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateDDatumDto: UpdateDDatumDto,
  ): Promise<any> {
    return this.dDataService.update(id, updateDDatumDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<any> {
    return await this.dDataService.remove(id);
  }
}
