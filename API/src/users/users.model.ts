import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { List, ListSchema } from '../Lists/lists.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ type: [ListSchema] })
  List: Types.DocumentArray<List>;
}

export const UserSchema = SchemaFactory.createForClass(User);
