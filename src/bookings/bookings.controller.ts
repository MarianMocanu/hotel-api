import { Controller, Post, Body, Get, Request, Delete, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDTO } from 'src/dtos/create-booking.dto';
import { AvailableRoomsDTO } from 'src/dtos/available-rooms.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createBooking(@Body() bookingData: CreateBookingDTO) {
    return this.bookingsService.create(bookingData);
  }

  @Get()
  getAllBookings() {
    return this.bookingsService.getAll();
  }

  @Post('available-rooms')
  getAvailableRooms(@Body() availableRooms: AvailableRoomsDTO) {
    return this.bookingsService.checkAvailability(availableRooms);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
