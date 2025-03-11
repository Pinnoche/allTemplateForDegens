import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Create User
  @Post('signup')
  async createUser(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) res,
  ) {
    const token = await this.authService.signup(signupDto);
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });
    return res.json('Signup Successfully');
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res) {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 24 * 1000,
      // expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    });
    return res.json({ token, message: 'Login Successsfully' });
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  async profile(@Req() req) {
    console.log('User Data:', req.user); // Debugging

    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }

    //  Return only necessary fields
    const user = {
      id: req.user._id,
      email: req.user.email,
      degen_name: req.user.degen_name,
    };
    return user;
  }

  // @Post('refresh')
  // async refreshToken(@Body() token: string): Promise<{ token: string }> {
  //   return this.authService.refreshToken(token);
  // }

  // @Post('logout')
  // async logout(@Res() res: Response) {
  //   res.clearCookie('token', {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'none',
  //   });
  //   return res.json('Logout Successfully');
  // }
}
