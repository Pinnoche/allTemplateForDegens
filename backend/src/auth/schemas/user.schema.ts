import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/roles/schema/roles.schema';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    unique: [true, 'You cannot have similar name as another Degen Please'],
    required: [true, 'Degen name is required'],
  })
  degen_name: string;

  @Prop({
    unique: [true, 'Duplicate Email'],
    required: [true, 'Email is required'],
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Role' })
  roleId: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
