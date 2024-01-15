import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsArray()
  facilities: string[];

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  maxGuests: number;

  @IsArray()
  @IsDate({ each: true })
  booked_dates: Date[];
}
