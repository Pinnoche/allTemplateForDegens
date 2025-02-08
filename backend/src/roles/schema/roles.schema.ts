import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ type: Map, of: Boolean, default: {} })
  permissions: Record<string, boolean>;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
