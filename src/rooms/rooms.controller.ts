import { BadRequestException, Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDTO } from 'src/dtos/create-room.dto';
import { HotelsService } from 'src/hotels/hotels.service';

@Controller('rooms')
export class RoomsController {


    constructor(private readonly roomsService: RoomsService, private readonly hotelsService: HotelsService) { }


    @Post()
    async createRoom(@Body() roomData: CreateRoomDTO) {
        return this.roomsService.create(roomData);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createRoomDTO: CreateRoomDTO) {
        return this.roomsService.update(id, createRoomDTO)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.roomsService.delete(id)
    }


}
