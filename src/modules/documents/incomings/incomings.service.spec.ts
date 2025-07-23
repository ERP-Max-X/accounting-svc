import { Test, TestingModule } from '@nestjs/testing';
import { IncomingsService } from './incomings.service';

describe('IncomingsService', () => {
  let service: IncomingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomingsService],
    }).compile();

    service = module.get<IncomingsService>(IncomingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
