import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServive: UsersService) {}
  // Get all Users
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersServive.getUsers();
  }

  // Get User by ID
  @Get(':id')
  @UseGuards(AuthGuard())
  getUserById(@Param('id') id: string) {
    return this.usersServive.getUser(id);
  }

  // Update User
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.usersServive.updateUser(id, user);
  }

  // Delete User
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersServive.deleteUser(id);
  }
}
