import { Test, TestingModule } from '@nestjs/testing';
import { OutgoingsService } from './outgoings.service';

describe('OutgoingsService', () => {
  let service: OutgoingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutgoingsService],
    }).compile();

    service = module.get<OutgoingsService>(OutgoingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
