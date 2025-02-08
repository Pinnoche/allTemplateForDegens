import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schema/roles.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async create(name: string, claims: Record<string, boolean>): Promise<Role> {
    return await this.roleModel.create({ name, claims });
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleModel.find();
  }

  async getRoleByName(name: string): Promise<Role> {
    return await this.roleModel.findOne({ name });
  }
}
