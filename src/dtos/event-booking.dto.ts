import {
  IsDate,
  IsDateString,
  IsDefined,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class EventBookingDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  venue_id: ObjectId;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  host_name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsDefined()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  guest_amount: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  start_time: string;

  @IsOptional()
  @IsString()
  end_time: string;

  @IsOptional()
  @IsString()
  corporation: string;

  @IsOptional()
  @IsString()
  comments: string;
}
