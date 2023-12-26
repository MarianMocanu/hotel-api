import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseModule } from 'src/database.module';
import { bookingsProviders } from './bookings.providers';
import { HotelsService } from 'src/hotels/hotels.service';
import { hotelsProviders } from 'src/hotels/hotels.providers';
import { RoomsService } from 'src/rooms/rooms.service';
import { roomsProviders } from 'src/rooms/rooms.providers';
import { AuthService } from 'src/auth/auth.service';
import { usersProviders } from 'src/auth/auth.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BookingsController],
  providers: [BookingsService, ...bookingsProviders, HotelsService, ...hotelsProviders, RoomsService, ...roomsProviders, AuthService, ...usersProviders],
})
export class BookingsModule {}
