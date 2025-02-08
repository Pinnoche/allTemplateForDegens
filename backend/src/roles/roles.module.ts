import { Module } from '@nestjs/common';
import { Role, RoleSchema } from './schema/roles.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
