import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUser(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException();
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserBySubdomain(subdomain: string): Promise<User> {
    return this.userModel.findOne({ degen_name: subdomain });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new NotAcceptableException();
    }
    const { degen_name } = user;
    const res = await this.userModel.findByIdAndUpdate(
      id,
      { degen_name },
      { new: true },
    );
    if (!res) {
      throw new NotFoundException('User not found');
    }
    return res;
  }

  async deleteUser(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new NotAcceptableException();
    }
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
