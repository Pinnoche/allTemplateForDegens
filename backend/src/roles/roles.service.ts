import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schema/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, permissions } = createRoleDto;
    const roles = new this.roleModel({ name, permissions });
    return await roles.save();
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleModel.find();
  }

  async getRoleByName(name: string): Promise<Role> {
    const role = await this.roleModel.findOne({ name });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async getRoleById(id: Role): Promise<Role> {
    return await this.roleModel.findById(id);
  }

  async clearRoles(): Promise<void> {
    await this.roleModel.deleteMany({});
  }
}
