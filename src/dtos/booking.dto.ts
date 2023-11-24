import { Prop } from '@nestjs/mongoose';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { GuestInfo } from 'src/schemas/booking.schema';

export class BookingDTO {
  @IsNotEmpty()
  @IsMongoId()
  hotel_id: ObjectId;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  room_id: ObjectId;

  // @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  services: ObjectId[];

  @IsNotEmpty()
  @IsDate()
  checkinDate: Date;

  @IsNotEmpty()
  @IsDate()
  checkoutDate: Date;

  @IsNotEmpty()
  @IsObject()
  @Prop({ type: GuestInfo })
  guestInfo: GuestInfo;

  @IsNumber()
  nights: number;

  @IsNotEmpty()
  @IsNumber()
  guestsAmount: number;

  @IsNumber()
  totalAmount: number;

  @IsString()
  comments: string;
}
