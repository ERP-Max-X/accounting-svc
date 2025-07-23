import { Test, TestingModule } from '@nestjs/testing';
import { ChatrAccountsUaService } from './chatr-accounts-ua.service';

describe('ChatrAccountsUaService', () => {
  let service: ChatrAccountsUaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatrAccountsUaService],
    }).compile();

    service = module.get<ChatrAccountsUaService>(ChatrAccountsUaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
