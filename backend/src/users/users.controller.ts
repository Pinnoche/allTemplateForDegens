import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  getUserById(@Param('id') id: string) {
    return this.usersServive.getUser(id);
  }

  // Create User
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersServive.create(user);
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
