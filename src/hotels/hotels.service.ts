import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateHotelDTO } from 'src/dtos/create-hotel.dto';
import { Hotel } from 'src/schemas/hotel.schema';

@Injectable()
export class HotelsService {

    constructor(@Inject('HOTEL_MODEL')
    private hotelModel: Model<Hotel>) {}


    create(createHotelDTO: CreateHotelDTO) {
        const createdHotel = new this.hotelModel(createHotelDTO);
        return createdHotel.save();
    }
}
