import { Test, TestingModule } from '@nestjs/testing';
import { ChatrAccountsUaController } from './chatr-accounts-ua.controller';
import { ChatrAccountsUaService } from './chatr-accounts-ua.service';

describe('ChatrAccountsUaController', () => {
  let controller: ChatrAccountsUaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatrAccountsUaController],
      providers: [ChatrAccountsUaService],
    }).compile();

    controller = module.get<ChatrAccountsUaController>(ChatrAccountsUaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
