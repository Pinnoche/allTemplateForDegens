import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users/users.service';
import { Reserved_Subdomain } from './reserved-subdomain';

@Injectable()
export class verifySubdomain implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private readonly reserved_subdomain: Reserved_Subdomain,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const rawSubdomain = req.headers['client-subdomain'];
    const subdomain = rawSubdomain.toString();
    // default subdomain to app if not found
    // if (!subdomain) {
    //   req.subdomains[0] = 'app';
    //   console.log(req.subdomains[0]);
    //   return next();
    // }
    // if (this.reserved_subdomain.subdomains.includes(subdomain)) {
    //   console.log('Reserved subdomain:', subdomain);
    //   const authHeader = req.headers.authorization;
    //   if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res
    //       .status(401)
    //       .json({ message: 'Unathorized: Please login first ' });
    //   }
    //   const token = authHeader.split(' ')[1];
    //   try {
    //     const decoded_token = await this.jwtService.verifyAsync(token);
    //     req.user = decoded_token;
    //     return next();
    //   } catch (error) {
    //     throw new UnauthorizedException(
    //       'Unauthorized: Invalid Token or Expired Token',
    //       error,
    //     );
    //   }
    // }
    try {
      const public_subdomain =
        await this.usersService.getUserBySubdomain(subdomain);
      if (!public_subdomain) {
        throw new BadRequestException('Page Not Found');
      }
      return next();
    } catch (error) {
      console.log('Error:', error);
      throw new InternalServerErrorException(error);
    }
  }
}
