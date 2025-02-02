import { Injectable } from '@nestjs/common';
import { CreateDDatumDto } from './dto/create-d-datum.dto';
// import { UpdateDDatumDto } from './dto/update-d-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './schemas/d-data.schema';
import { Model } from 'mongoose';

@Injectable()
export class DDataService {
  @InjectModel(Data.name)
  private readonly dataModel: Model<DataDocument>;

  async create(createDDatumDto: CreateDDatumDto) {
    return await this.dataModel.create(createDDatumDto);
  }

  findAll() {
    return `This action returns all dData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dDatum`;
  }

  // update(id: number, updateDDatumDto: UpdateDDatumDto) {
  //   return `This action updates a #${id} dDatum`;
  // }

  remove(id: number) {
    return `This action removes a #${id} dDatum`;
  }
}
