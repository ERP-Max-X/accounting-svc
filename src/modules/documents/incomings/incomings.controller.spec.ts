import { Test, TestingModule } from '@nestjs/testing';
import { IncomingsController } from './incomings.controller';
import { IncomingsService } from './incomings.service';

describe('IncomingsController', () => {
  let controller: IncomingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomingsController],
      providers: [IncomingsService],
    }).compile();

    controller = module.get<IncomingsController>(IncomingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
