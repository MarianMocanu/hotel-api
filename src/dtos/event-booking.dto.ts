import {
  IsArray,
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class EventBookingDTO {
  @IsNotEmpty()
  @IsMongoId()
  venue_id: ObjectId;

  @IsNotEmpty()
  @IsString()
  host_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  guest_amount: number;

  @IsArray()
  time_slot: string[];

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsString()
  corporation: string;

  @IsString()
  comments: string;
}
