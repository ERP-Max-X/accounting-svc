import { Test, TestingModule } from '@nestjs/testing';
import { ChartAccountsUaService } from './chart-accounts-ua.service';

describe('ChartAccountsUaService', () => {
  let service: ChartAccountsUaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChartAccountsUaService],
    }).compile();

    service = module.get<ChartAccountsUaService>(ChartAccountsUaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
