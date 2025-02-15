import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Create User
  @Post('signup')
  async createUser(@Body() signupDto: SignupDto, @Res() res: Response) {
    const token = await this.authService.signup(signupDto);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
    });
    return res.json('Signup Successfully');
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });
    return res.json({ token, message: 'Login Successsfully' });
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req) {
    return { user: req.user };
  }

  @Post('refresh')
  async refreshToken(@Body() token: string): Promise<{ token: string }> {
    return this.authService.refreshToken(token);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });
    return res.json('Logout Successfully');
  }
}
