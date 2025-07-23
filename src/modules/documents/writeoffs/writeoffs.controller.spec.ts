import { Test, TestingModule } from '@nestjs/testing';
import { WriteoffsController } from './writeoffs.controller';
import { WriteoffsService } from './writeoffs.service';

describe('WriteoffsController', () => {
  let controller: WriteoffsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WriteoffsController],
      providers: [WriteoffsService],
    }).compile();

    controller = module.get<WriteoffsController>(WriteoffsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
