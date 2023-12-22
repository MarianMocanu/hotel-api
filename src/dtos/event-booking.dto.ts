import {
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
  @IsNumber()
  guest_amount: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsString()
  start_time: string;

  @IsString()
  end_time: string;

  @IsString()
  corporation: string;

  @IsString()
  comments: string;
}
