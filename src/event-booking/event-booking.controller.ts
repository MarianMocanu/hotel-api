import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EventBookingService } from './event-booking.service';
import { EventBookingDTO } from 'src/dtos/event-booking.dto';
import { EventQueryDTO } from 'src/dtos/event-query.dto';

@Controller('event-booking')
export class EventBookingController {
  constructor(private readonly eventBookingService: EventBookingService) {}

  @Post()
  create(@Body() eventBookingDto: EventBookingDTO) {
    return this.eventBookingService.create(eventBookingDto);
  }

  @Get()
  findAll() {
    return this.eventBookingService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.eventBookingService.findOne(id);
  // }

  @Post('inquiry')
  getAvailableVenues(@Body() eventBookingQuery: EventQueryDTO) {
    return this.eventBookingService.getVenues(eventBookingQuery);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() eventBookingDto: EventBookingDTO) {
    return this.eventBookingService.update(id, eventBookingDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventBookingService.delete(id);
  }
}
