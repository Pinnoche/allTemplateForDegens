import { Injectable, OnModuleInit } from '@nestjs/common';
import { RolesService } from './roles.service';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/roles.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleFactory implements OnModuleInit {
  constructor(
    private readonly rolesService: RolesService,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async onModuleInit() {
    const roles = [
      {
        name: 'superadmin',
        permissions: {
          canManageUsers: true,
          canEditContent: true,
          canDeleteContent: true,
        },
      },
      {
        name: 'admin',
        permissions: {
          canEditContent: true,
          canDeleteContent: false,
        },
      },
    ];

    for (const role of roles) {
      const existingRole = await this.roleModel.findOne({ name: role.name });
      if (!existingRole) {
        const createRoleDto: CreateRoleDto = {
          name: role.name,
          permissions: role.permissions,
        };
        await this.rolesService.create(createRoleDto);
        console.log(`Created role: ${role.name}`);
      }
    }
  }
}
