import { Test, TestingModule } from '@nestjs/testing';
import { EventVenuesService } from './event-venues.service';

describe('EventVenuesService', () => {
  let service: EventVenuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventVenuesService],
    }).compile();

    service = module.get<EventVenuesService>(EventVenuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
