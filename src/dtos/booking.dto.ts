import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsDefined,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { GuestInfo } from 'src/schemas/booking.schema';

export class BookedRoom {
  @IsNotEmpty()
  @IsMongoId()
  roomId: string;

  @IsNotEmpty()
  @IsMongoId()
  packageId: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  addonsIds?: string[];

  @IsNotEmpty()
  @IsObject()
  guest: GuestInfo;
}

export class BookingDTO {
  @IsNotEmpty()
  @IsMongoId()
  hotelId: string;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookedRoom)
  rooms: BookedRoom[];

  @IsNotEmpty()
  @IsDateString()
  checkinDate: string;

  @IsNotEmpty()
  @IsDateString()
  checkoutDate: string;

  @IsNotEmpty()
  @IsObject()
  @Prop({ type: GuestInfo })
  guest: GuestInfo;

  @IsNotEmpty()
  @IsNumber()
  guestsAmount: number;
}
