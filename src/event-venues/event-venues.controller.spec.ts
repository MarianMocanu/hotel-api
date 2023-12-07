import { Test, TestingModule } from '@nestjs/testing';
import { EventVenuesController } from './event-venues.controller';
import { EventVenuesService } from './event-venues.service';

describe('EventVenuesController', () => {
  let controller: EventVenuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventVenuesController],
      providers: [EventVenuesService],
    }).compile();

    controller = module.get<EventVenuesController>(EventVenuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
