import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/user.schema';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/schema/roles.schema';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('superadmin')
export class SuperadminController {
  constructor(
    private roleService: RolesService,
    private usersService: UsersService,
  ) {}

  // Create a new role
  @Post('create-role')
  async createRole(@Body() cretaRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleService.create(cretaRoleDto);
  }

  // Get all roles
  @Get('get-roles')
  async getRoles(): Promise<Role[]> {
    return await this.roleService.getAllRoles();
  }

  // Get role by name
  @Get(':name')
  async getRoleByName(@Param('name') name: string): Promise<Role> {
    return await this.roleService.getRoleByName(name);
  }

  // Clear all Roles
  @Delete('clear-roles')
  async clearRoles(): Promise<void> {
    return await this.roleService.clearRoles();
  }

  //   // Update role by name
  //   @Post('update-role')
  //   async updateRole(
  //     @Body() name: string,
  //     claims: Record<string, boolean>,
  //   ): Promise<Role> {
  //     return await this.roleService.updateRole(name, claims);
  //   }

  // Delete role by name
  //   @Post('delete-role')
  //   async deleteRole(@Body() name: string): Promise<Role> {
  //     return await this.roleService.deleteRole(name);
  //   }

  // Get all users
  @Get('get-users')
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  // Get user by subdomain
  @Get('get-user')
  async getUserBySubdomain(@Body() subdomain: string): Promise<User> {
    return await this.usersService.getUserBySubdomain(subdomain);
  }

  // Get User by ID
  @Get(':id')
  @UseGuards(AuthGuard())
  getUserById(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  // Update User
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, user);
  }

  // Delete User
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
