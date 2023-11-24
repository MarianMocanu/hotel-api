import { IsDate, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class BookingQueryDTO {
  @IsNotEmpty()
  @IsMongoId()
  hotelId: ObjectId;

  @IsNotEmpty()
  @IsDate()
  checkinDate: Date;

  @IsNotEmpty()
  @IsDate()
  checkoutDate: Date;

  @IsNotEmpty()
  @IsNumber()
  guestsAmount: number;
}
