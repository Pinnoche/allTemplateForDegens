import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users/users.service';

@Injectable()
export class verifySubdomain implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const subdomain = req.subdomains[0];
    const reservedSubdomains = ['app', 'admin'];
    if (!reservedSubdomains.includes(subdomain)) {
      const publicSubdomain =
        await this.usersService.getUserBySubdomain(subdomain);
      if (!publicSubdomain) {
        throw new BadRequestException('Page Not Found');
      }
      return (req.user = subdomain);

      //   return (req.user[user] = 'isAdmin');
    }

    next();
  }
}
