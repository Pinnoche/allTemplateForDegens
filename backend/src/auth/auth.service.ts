import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { degen_name, email, password } = signupDto;
    const hashPass = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      degen_name,
      email,
      password: hashPass,
    });
    if (!user) {
      throw new ConflictException('Degen name or Email Already Exist');
    }
    const payload = { id: user._id, username: user.degen_name };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const isPassword = bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new UnauthorizedException('Invalid Degenname or Password');
    }
    const payload = { id: user._id, username: user.degen_name };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
