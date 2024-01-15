import { IsDateString, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class BookingQueryDTO {
  @IsNotEmpty()
  @IsMongoId()
  hotelId: string;

  @IsNotEmpty()
  @IsDateString()
  checkinDate: string;

  @IsNotEmpty()
  @IsDateString()
  checkoutDate: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfRooms: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfGuests: number;
}
