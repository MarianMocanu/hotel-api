import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from './room.schema';
import { Service } from './service.schema';

export type BookingDocument = HydratedDocument<Booking>;

export interface GuestInfo {
    user_id?: string;
    name: string;
    phone: string;
    email: string;
    address: object;
  }

@Schema()
export class Booking {
  @Prop()
  hotel_id: string;

  @Prop()
  room_id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }] })
  services: Service[];

  @Prop()
  checkinDate: Date;

  @Prop()
  checkoutDate: Date;

//   @Prop()
//   guestInfo: GuestInfo;

  @Prop()
  nights: number;

  @Prop()
  guestsAmount: number;

  @Prop()
  totalAmount: number;

  @Prop()
  comments: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
