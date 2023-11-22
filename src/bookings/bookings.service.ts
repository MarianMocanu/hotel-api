import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBookingDTO } from 'src/dtos/create-booking.dto';
import { HotelsService } from 'src/hotels/hotels.service';
import { Booking } from 'src/schemas/booking.schema';
import { Room } from 'src/schemas/room.schema';
import { eachDayOfInterval, format } from 'date-fns';
import { RoomsService } from 'src/rooms/rooms.service';
import { AvailableRoomsDTO } from 'src/dtos/available-rooms.dto';

interface BookingData {
  hotel_id: string;
  guest_amount: number;
  checkin_date: string;
  checkout_date: string;
}

@Injectable()
export class BookingsService {
  constructor(
    @Inject('BOOKING_MODEL')
    private bookingModel: Model<Booking>,
    private hotelsService: HotelsService,
    private roomsService: RoomsService,
  ) {}

  async create(createBookingDTO: CreateBookingDTO) {
    try {
      const createdBooking = await new this.bookingModel(createBookingDTO);
      const checkin = new Date(createBookingDTO.checkinDate);
      const checkout = new Date(createBookingDTO.checkoutDate);
      const dates = getDatesBetweenDates(checkin, checkout);

      // add booked dates to the hotel
      await this.roomsService.bookRoom(createBookingDTO.room_id, dates);

      return createdBooking.save();
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async getAll(): Promise<Booking[]> {
    try {
      const response = await this.bookingModel.find().exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async checkAvailability(bookingData: AvailableRoomsDTO) {
    // get dates in between of checkin and checkout dates
    let checkinDate = new Date(bookingData.checkinDate);
    let checkoutDate = new Date(bookingData.checkoutDate);
    const dates = getDatesBetweenDates(checkinDate, checkoutDate);
    const datesToString = dates.map(date => format(date, 'yyyy-MM-dd'));

    try {
      // get hotel data with all the info - rooms and services
      const hotel = await this.hotelsService.getHotelData(bookingData.hotelId);

      // check available rooms

      const availableRooms: Room[] = [];

      for (const room of hotel.rooms) {
        if (room.maxGuests >= Number(bookingData.guestsAmount)) {
          let isAvailable = true;

          for (let bookedDate of room.booked_dates) {
            let bookedDateString = format(bookedDate, 'yyyy-MM-dd');

            if (datesToString.includes(bookedDateString)) {
              console.log('taken', bookedDateString);

              isAvailable = false;
              console.log('room', room.name, 'NOT available');
              break;
            }
          }

          if (isAvailable) {
            console.log('room', room.name, 'available');

            availableRooms.push(room);
          }
        }
      }

      return { rooms: availableRooms, hotel_services: hotel.services };
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: string): Promise<Booking> {
    try {
      const response = await this.bookingModel.findByIdAndDelete(id).exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }
}

function getDatesBetweenDates(startDate: Date, endDate: Date) {
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  //delete the last day as doesnt count as night at the hotel
  dates.pop();
  return dates;
}
