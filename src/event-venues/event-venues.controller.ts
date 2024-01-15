import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EventVenuesService } from './event-venues.service';
import { EventVenueDTO } from '../dtos/event-venue.dto';

@Controller('event-venues')
export class EventVenuesController {
  constructor(private readonly eventVenuesService: EventVenuesService) {}

  @Post()
  create(@Body() createEventVenueDto: EventVenueDTO) {
    return this.eventVenuesService.create(createEventVenueDto);
  }

  @Get()
  getAll() {
    return this.eventVenuesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventVenuesService.findByHotelId(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() eventVenueDto: EventVenueDTO) {
    return this.eventVenuesService.update(id, eventVenueDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventVenuesService.delete(id);
  }
}
