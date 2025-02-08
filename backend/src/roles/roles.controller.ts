import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './schema/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  async getRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<any> {
    return await this.rolesService.create(createRoleDto);
  }
}
