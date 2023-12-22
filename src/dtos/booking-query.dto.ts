import { IsDate, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class BookingQueryDTO {
  @IsNotEmpty()
  @IsMongoId()
  hotelId: ObjectId;

  @IsNotEmpty()
  @IsDate()
  checkinDate: string;

  @IsNotEmpty()
  @IsDate()
  checkoutDate: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfRooms: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfGuests: number;
}
