import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDDatumDto } from './dto/create-d-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Data } from './schemas/d-data.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateDDatumDto } from './dto/update-d-datum.dto';
import { deleteImagesFromS3, uploadImagesToS3 } from 'src/Utils/asw';

// interface S3Image {
//   Bucket: string;
//   Key: string;
//   Location: string;
// }
@Injectable()
export class DDataService {
  @InjectModel(Data.name)
  private readonly dataModel: Model<Data>;

  async create(createDDatumDto: CreateDDatumDto, user: User): Promise<Data> {
    const existingData = await this.dataModel.findOne({ userId: user._id });
    if (existingData) {
      throw new NotAcceptableException('User Data already exist');
    }
    const newData = new this.dataModel({
      ...createDDatumDto,
      userId: user._id,
    });
    return await newData.save();
  }

  async getDatum(): Promise<Data[]> {
    const data = await this.dataModel.find().exec();
    if (!data) {
      throw new NotFoundException('Data not Available');
    }
    return data;
  }

  async getBySubdomain(subdomain: Data): Promise<Data> {
    return await this.dataModel.findOne({ degen_name: subdomain });
  }

  async getDataByUserId(user: User) {
    const { _id } = user;
    const data = await this.dataModel.findOne({
      userId: _id,
    });
    return data;
  }

  async getData(id: string): Promise<Data> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new NotAcceptableException();
    }
    const data = await this.dataModel.findOne({
      userId: new mongoose.Types.ObjectId(id),
    });
    if (!data) {
      throw new NotFoundException('Data not Available');
    }
    return data;
  }

  async update(id: string, updateDDatumDto: UpdateDDatumDto): Promise<Data> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new NotAcceptableException();
    }
    const data = await this.dataModel.findByIdAndUpdate(
      id,
      { ...updateDDatumDto },
      { new: true, runValidators: true },
    );
    if (!data) {
      throw new NotFoundException('Data not available');
    }
    return data;
  }

  async remove(id: string): Promise<any> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new NotAcceptableException();
    }
    const data = await this.dataModel.findByIdAndDelete(id).exec();
    if (!data) {
      throw new NotFoundException('User not found');
    }
    return { message: 'Data deleted Successfully' };
  }

  async uploadImages(files: Array<Express.Multer.File>) {
    // const isValidId = mongoose.isValidObjectId(id);
    // if (!isValidId) {
    //   throw new NotAcceptableException();
    // }
    // const data = await this.dataModel.findById(id);
    // if (!data) {
    //   throw new NotFoundException('Data not found');
    // }
    const imageUrls = (await uploadImagesToS3(files)) as Array<{
      Bucket: string;
      Key: string;
      Location: string;
    }>;

    console.log(imageUrls.map((image) => image.Location));
    return imageUrls.map((image) => image.Location);
  }

  async deleteImages(files: string) {
    // const isValidId = mongoose.isValidObjectId(id);
    // if (!isValidId) {
    //   throw new NotAcceptableException();
    // }
    // const data = await this.dataModel.findById(id);
    //
    // if (!data) {
    //   throw new NotFoundException('Data not found');
    // }
    const imageData = await deleteImagesFromS3(files);
    return imageData;
  }
}
