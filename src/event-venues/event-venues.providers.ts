import { Connection } from 'mongoose';
import { EventVenueSchema } from 'src/schemas/event-venue.schema';

export const eventVenuesProviders = [
  {
    provide: 'EVENT_VENUE_MODEL',
    useFactory: (connection: Connection) => connection.model('EventVenue', EventVenueSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
