import { Module } from '@nestjs/common';
import { EventVenuesService } from './event-venues.service';
import { DatabaseModule } from 'src/database.module';
import { EventVenuesController } from './event-venues.controller';
import { eventVenuesProviders } from './event-venues.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EventVenuesController],
  providers: [EventVenuesService, ...eventVenuesProviders],
  exports: [EventVenuesService]
})
export class EventVenuesModule {}
