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


export class CreateBookingDTO {
  // @IsNotEmpty()
  @IsMongoId()
  hotel_id: ObjectId;

  // @IsNotEmpty()
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

  @IsNotEmpty()
  @IsNumber()
  nights: number;

  @IsNotEmpty()
  @IsNumber()
  guestsAmount: number;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsString()
  comments: string;

  constructor(
    hotel_id: ObjectId,
    room_id: ObjectId,
    services: ObjectId[],
    checkinDate: Date,
    checkoutDate: Date,
    guestInfo: GuestInfo,
    nights: number,
    guestsAmount: number,
    totalAmount: number,
    comments: string,
  ) {
    this.hotel_id = hotel_id;
    this.room_id = room_id;
    this.services = services;
    this.checkinDate = checkinDate;
    this.checkoutDate = checkoutDate;
    this.guestInfo = guestInfo;
    this.nights = nights;
    this.guestsAmount = guestsAmount;
    this.totalAmount = totalAmount;
    this.comments = comments;
  }
}
