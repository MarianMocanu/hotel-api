import { Connection } from 'mongoose';
import { EventBookingSchema } from 'src/schemas/event-booking.schema';

export const eventBookingProviders = [
  {
    provide: 'EVENT_BOOKING_MODEL',
    useFactory: (connection: Connection) => connection.model('EventBooking', EventBookingSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
