import { Controller, Post, Body, Get, Request, Delete, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDTO } from 'src/dtos/booking.dto';
import { BookingQueryDTO } from 'src/dtos/booking-query.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createBooking(@Body() bookingData: BookingDTO) {
    return this.bookingsService.create(bookingData);
  }

  @Get()
  getAllBookings() {
    return this.bookingsService.getAll();
  }

  @Post('available-rooms')
  getAvailableRooms(@Body() bookingQuery: BookingQueryDTO) {
    return this.bookingsService.getAvailable(bookingQuery);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
