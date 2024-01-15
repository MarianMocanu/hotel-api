import { Test, TestingModule } from '@nestjs/testing';
import { EventBookingService } from './event-booking.service';

describe('EventBookingService', () => {
  let service: EventBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventBookingService],
    }).compile();

    service = module.get<EventBookingService>(EventBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
