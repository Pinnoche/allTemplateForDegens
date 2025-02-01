import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async signIn(degen_name: string, pass: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ degen_name: degen_name });
    if (!user) {
      throw new Error('user not found');
    }
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.degen_name };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
