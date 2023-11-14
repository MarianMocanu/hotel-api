import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export class CreateRoomDTO {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsArray()
    images: string[];

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


    constructor(name: string, description: string, type: string, size: number, facilities: string[], images: string[], price: number, maxGuests: number, booked_dates: Date[]) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.size = size;
        this.facilities = facilities;
        this.images = images;
        this.price = price;
        this.maxGuests = maxGuests;
        this.booked_dates = booked_dates;
    }

}



