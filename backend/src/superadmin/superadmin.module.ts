import { Module } from '@nestjs/common';
import { SuperadminController } from './superadmin.controller';
import { Superadmin } from './superadmin';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [AuthModule, UsersModule, RolesModule],
  controllers: [SuperadminController],
  providers: [Superadmin],
})
export class SuperadminModule {}
