import { BadRequestException, Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomDTO } from 'src/dtos/room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async createRoom(@Body() roomData: RoomDTO) {
    return this.roomsService.create(roomData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createRoomDTO: RoomDTO) {
    return this.roomsService.update(id, createRoomDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomsService.delete(id);
  }
}
