import { Injectable } from '@nestjs/common';
import { CreateWriteoffDto } from './dto/create-writeoff.dto';
import { UpdateWriteoffDto } from './dto/update-writeoff.dto';

@Injectable()
export class WriteoffsService {
  create(createWriteoffDto: CreateWriteoffDto) {
    return 'This action adds a new writeoff';
  }

  findAll() {
    return `This action returns all writeoffs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} writeoff`;
  }

  update(id: number, updateWriteoffDto: UpdateWriteoffDto) {
    return `This action updates a #${id} writeoff`;
  }

  remove(id: number) {
    return `This action removes a #${id} writeoff`;
  }
}
