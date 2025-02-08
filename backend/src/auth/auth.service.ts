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
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/schema/roles.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private roleService: RolesService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { degen_name, email, password } = signupDto;
    const role = await this.getRole('admin');
    const hashPass = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      degen_name,
      email,
      roleId: role._id,
      password: hashPass,
    });
    if (!user) {
      throw new ConflictException('Degen name or Email Already Exist');
    }
    const payload = {
      id: user._id,
      role: role.name,
      permission: role.permissions,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new UnauthorizedException('Invalid Degenname or Password');
    }
    const role = await this.roleService.getRoleById(user.roleId);
    return this.generateJwt(user, role);
  }

  private async getRole(roleName: string) {
    const role = await this.roleService.getRoleByName(roleName);
    if (!role) {
      throw new NotFoundException(`Role ${roleName} does not exist.
        \n\nCreate a Role Schema First and Migrate it`);
    }
    return role;
  }
  private async generateJwt(
    user: User,
    role: Role,
  ): Promise<{ token: string }> {
    const payload = {
      id: user._id,
      role: role.name,
      permission: role.permissions,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
