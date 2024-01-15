import { Test, TestingModule } from '@nestjs/testing';
import { EventBookingController } from './event-booking.controller';
import { EventBookingService } from './event-booking.service';

describe('EventBookingController', () => {
  let controller: EventBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventBookingController],
      providers: [EventBookingService],
    }).compile();

    controller = module.get<EventBookingController>(EventBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
