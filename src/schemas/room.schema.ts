import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop()
  images: string[];

  @Prop()
  type: string;

  @Prop()
  size: number;

  @Prop()
  facilities: string[];

  @Prop()
  price: number;

  @Prop()
  maxGuests: number;

  @Prop({ type: [Date] })
  booked_dates: Date[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
