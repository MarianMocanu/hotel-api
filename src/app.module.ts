import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { usersProviders } from './auth/auth.providers';
import { DatabaseModule } from './database.module';
import { HotelsService } from './hotels/hotels.service';
import { HotelsController } from './hotels/hotels.controller';
import { HotelsModule } from './hotels/hotels.module';
import { hotelsProviders } from './hotels/hotels.providers';
import { RoomsService } from './rooms/rooms.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsModule } from './rooms/rooms.module';
import { roomsProviders } from './rooms/rooms.providers';
import { bookingsProviders } from './bookings/bookings.providers';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './bookings/bookings.module';
import { EventVenuesModule } from './event-venues/event-venues.module';
import { EventBookingModule } from './event-booking/event-booking.module';
import { eventBookingProviders } from './event-booking/event-booking.providers';


@Module({
  imports: [AuthModule, DatabaseModule, HotelsModule, RoomsModule, ServicesModule, BookingsModule, EventVenuesModule, EventBookingModule],
  controllers: [AppController, AuthController, HotelsController, RoomsController],
  providers: [AppService, AuthService, ...usersProviders, ...hotelsProviders, ...roomsProviders, ...bookingsProviders, ...eventBookingProviders, HotelsService, RoomsService],
})
export class AppModule {}
