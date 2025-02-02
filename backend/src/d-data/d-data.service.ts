import { Injectable } from '@nestjs/common';
import { CreateDDatumDto } from './dto/create-d-datum.dto';
// import { UpdateDDatumDto } from './dto/update-d-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './schemas/d-data.schema';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class DDataService {
  @InjectModel(Data.name)
  private readonly dataModel: Model<DataDocument>;

  async create(createDDatumDto: CreateDDatumDto): Promise<any> {
    return await this.dataModel.create(createDDatumDto);
  }

  async getDatum(): Promise<any> {}

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
