import { Injectable } from '@nestjs/common';
import { CreateIncomingDto } from './dto/create-incoming.dto';
import { UpdateIncomingDto } from './dto/update-incoming.dto';

@Injectable()
export class IncomingsService {
  create(createIncomingDto: CreateIncomingDto) {
    return 'This action adds a new incoming';
  }

  findAll() {
    return `This action returns all incomings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incoming`;
  }

  update(id: number, updateIncomingDto: UpdateIncomingDto) {
    return `This action updates a #${id} incoming`;
  }

  remove(id: number) {
    return `This action removes a #${id} incoming`;
  }
}
