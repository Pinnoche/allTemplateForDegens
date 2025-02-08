import { Module } from '@nestjs/common';
import { Role, RoleSchema } from './schema/roles.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RolesService],
  exports: [RolesService, MongooseModule],
  controllers: [RolesController],
})
export class RolesModule {}
