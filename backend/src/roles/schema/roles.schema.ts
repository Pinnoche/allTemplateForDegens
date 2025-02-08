import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Role extends Document {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ type: Object, default: {} })
  claims: Record<string, boolean>;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
