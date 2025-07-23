import { Module } from '@nestjs/common';
import { ChatrAccountsUaService } from './chatr-accounts-ua.service';
import { ChatrAccountsUaController } from './chatr-accounts-ua.controller';

@Module({
  controllers: [ChatrAccountsUaController],
  providers: [ChatrAccountsUaService],
})
export class ChatrAccountsUaModule {}
