import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUser(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException();
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const res = await this.userModel.create(user);
    return res;
    // return await res.save();
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException();
    }
    const { degen_name, ticker } = user;
    const res = await this.userModel.findByIdAndUpdate(
      id,
      { degen_name, ticker },
      { new: true },
    );
    if (!res) {
      throw new NotFoundException('User not found');
    }
    return res;
  }

  async deleteUser(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException();
    }
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
