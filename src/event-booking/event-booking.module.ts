import { Module } from '@nestjs/common';
import { EventBookingService } from './event-booking.service';
import { EventBookingController } from './event-booking.controller';
import { eventBookingProviders } from './event-booking.providers';
import { DatabaseModule } from 'src/database.module';
import { EventVenuesService } from 'src/event-venues/event-venues.service';
import { EventVenuesModule } from 'src/event-venues/event-venues.module';

@Module({
  imports: [DatabaseModule, EventVenuesModule],
  controllers: [EventBookingController],
  providers: [EventBookingService, ...eventBookingProviders],
})
export class EventBookingModule {}
