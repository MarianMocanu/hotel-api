import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDTO } from 'src/dtos/create-hotel.dto';

@Controller('hotels')
export class HotelsController {

    constructor(private readonly hotelsService: HotelsService) {}

    @Post()
    createHotel(@Body() hotelData: CreateHotelDTO) {
        return this.hotelsService.create(hotelData);
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() createHotelDTO: CreateHotelDTO) {
        return this.hotelsService.update(id, createHotelDTO)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.hotelsService.delete(id)
    }

    @Get()
    getAllHotels() {
        return this.hotelsService.getAll()
    }
    @Get(':id/rooms')
    getHotelRooms(@Param('id') id: string) {
        return this.hotelsService.getRooms(id)
    }



}
