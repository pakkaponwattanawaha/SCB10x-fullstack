import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
// import { UserDetails } from 'src/user/user-details.interface';
import { User } from 'src/user/user.schema';

export type PartyDocument = Party & Document;

export class UserDetails {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, unique: true })
  id: string;
}
// export const UserSchema = SchemaFactory.createForClass(UserDetails);

@Schema()
export class Party {
  // @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  // id: Types.ObjectId;
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true, unique: true })
  owner: UserDetails;
  @Prop()
  limit: number;
  @Prop()
  description: string;
  @Prop()
  members: Array<UserDetails>;
}

export const PartySchema = SchemaFactory.createForClass(Party);
