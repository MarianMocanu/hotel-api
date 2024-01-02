import {
  IsDateString,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EventQueryDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  hotel_id: string;

  @IsDefined()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsDefined()
  @IsNotEmpty()
  guest_amount: number;

  @IsOptional()
  @IsString()
  start_time: string;

  @IsOptional()
  @IsString()
  end_time: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  type: string;
}
