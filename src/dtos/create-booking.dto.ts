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

export class CreateBookingDTO {
  // @IsNotEmpty()
  @IsMongoId()
  hotel_id: ObjectId;

  // @IsNotEmpty()
  @IsMongoId({ each: true })
  rooms: ObjectId[];

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
  guestInfo: object;

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
    rooms: ObjectId[],
    services: ObjectId[],
    checkinDate: Date,
    checkoutDate: Date,
    guestInfo: object,
    nights: number,
    guestsAmount: number,
    totalAmount: number,
    comments: string,
  ) {
    this.hotel_id = hotel_id;
    this.rooms = rooms;
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
