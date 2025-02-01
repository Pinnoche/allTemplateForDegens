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
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
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

  async create(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const { degen_name, email, password } = createUserDto;
    const hashPass = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      degen_name,
      email,
      password: hashPass,
    });
    const payload = { sub: user._id, username: user.degen_name };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
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
