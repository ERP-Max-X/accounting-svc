import { Test, TestingModule } from '@nestjs/testing';
import { ChartAccountsUaController } from './chart-accounts-ua.controller';
import { ChartAccountsUaService } from './chart-accounts-ua.service';

describe('ChartAccountsUaController', () => {
  let controller: ChartAccountsUaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartAccountsUaController],
      providers: [ChartAccountsUaService],
    }).compile();

    controller = module.get<ChartAccountsUaController>(ChartAccountsUaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
