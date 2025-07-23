import { Test, TestingModule } from '@nestjs/testing';
import { OutgoingsController } from './outgoings.controller';
import { OutgoingsService } from './outgoings.service';

describe('OutgoingsController', () => {
  let controller: OutgoingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutgoingsController],
      providers: [OutgoingsService],
    }).compile();

    controller = module.get<OutgoingsController>(OutgoingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
