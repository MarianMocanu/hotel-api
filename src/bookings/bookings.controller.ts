import { Controller, Post, Body, Get, Request, Delete, Param} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDTO } from 'src/dtos/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}


  @Post()
  createBooking(@Body() bookingData: CreateBookingDTO) {
    return this.bookingsService.create(bookingData);
  }

  @Get()
  getAllBookings() {
      return this.bookingsService.getAll()
  }

  @Get('available-rooms')
  getAvailableRooms(@Request() req) {
    return this.bookingsService.checkAvailability(req.headers)
  }


  @Delete(':id')
  delete(@Param('id') id: string) {
      return this.bookingsService.delete(id)
  }



}
