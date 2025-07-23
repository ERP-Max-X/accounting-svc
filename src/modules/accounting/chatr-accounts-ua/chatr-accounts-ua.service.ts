import { Injectable } from '@nestjs/common';
import { CreateChatrAccountsUaDto } from './dto/create-chatr-accounts-ua.dto';
import { UpdateChatrAccountsUaDto } from './dto/update-chatr-accounts-ua.dto';

@Injectable()
export class ChatrAccountsUaService {
  create(createChatrAccountsUaDto: CreateChatrAccountsUaDto) {
    return 'This action adds a new chatrAccountsUa';
  }

  findAll() {
    return `This action returns all chatrAccountsUa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatrAccountsUa`;
  }

  update(id: number, updateChatrAccountsUaDto: UpdateChatrAccountsUaDto) {
    return `This action updates a #${id} chatrAccountsUa`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatrAccountsUa`;
  }
}
