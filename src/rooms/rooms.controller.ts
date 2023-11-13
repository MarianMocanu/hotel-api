import { BadRequestException, Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDTO } from 'src/dtos/create-room.dto';
import { HotelsService } from 'src/hotels/hotels.service';

@Controller('rooms')
export class RoomsController {


    constructor(private readonly roomsService: RoomsService, private readonly hotelsService: HotelsService) { }


    @Post('create')
    async createHotel(@Body() roomData: CreateRoomDTO) {
        //should i check this here or in the service?
        const doesHotelExists = await this.hotelsService.checkIfHotelExists(roomData.hotel_id);

        if (doesHotelExists) {
            return this.roomsService.create(roomData);
        } else {
            return new BadRequestException('Invalid hotel_id');
        }
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() createRoomDTO: CreateRoomDTO) {
        return this.roomsService.update(id, createRoomDTO)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.roomsService.delete(id)
    }


}
