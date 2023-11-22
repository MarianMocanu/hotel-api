import { IsDate, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AvailableRoomsDTO {
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

  constructor(checkinDate: Date, checkoutDate: Date, guestsAmount: number) {
    this.checkinDate = checkinDate;
    this.checkoutDate = checkoutDate;
    this.guestsAmount = guestsAmount;
  }
}
