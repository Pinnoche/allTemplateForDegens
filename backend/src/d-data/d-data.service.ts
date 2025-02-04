import { Injectable } from '@nestjs/common';
import { CreateDDatumDto } from './dto/create-d-datum.dto';
// import { UpdateDDatumDto } from './dto/update-d-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Data } from './schemas/d-data.schema';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class DDataService {
  @InjectModel(Data.name)
  private readonly dataModel: Model<Data>;

  async create(createDDatumDto: CreateDDatumDto, user: User): Promise<any> {
    const data = Object.assign(createDDatumDto, { userId: user._id });
    return await this.dataModel.create(data);
  }

  async getDatum(): Promise<any> {
    return await this.dataModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} dDatum`;
  }

  async getDataByUserId(user: User) {
    const { _id } = user;
    const data = await this.dataModel.findOne({
      userId: _id,
    });
    return data;
  }

  // update(id: number, updateDDatumDto: UpdateDDatumDto) {
  //   return `This action updates a #${id} dDatum`;
  // }

  remove(id: number) {
    return `This action removes a #${id} dDatum`;
  }
}
