import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const token = req?.cookies?.token;

        if (token && typeof token === 'object' && 'token' in token) {
          console.log('Extracted Token:', token.token);
          return token.token;
        }

        console.log('Extracted Token:', token);
        return token || null;
      },
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload): Promise<any> {
    console.log('Received Payload:', payload);
    const user = await this.usersService.getUser(payload.id);

    if (!user) {
      throw new UnauthorizedException('Please Login to access this feature');
    }
    return user;
  }
}
