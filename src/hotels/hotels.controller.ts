import { Controller, Post, Body } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDTO } from 'src/dtos/create-hotel.dto';

@Controller('hotels')
export class HotelsController {

    constructor(private readonly hotelsService: HotelsService) {}

    @Post('create')
    createHotel(@Body() hotelData: CreateHotelDTO) {
        return this.hotelsService.create(hotelData);
    }



}
