import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WriteoffsService } from './writeoffs.service';
import { CreateWriteoffDto } from './dto/create-writeoff.dto';
import { UpdateWriteoffDto } from './dto/update-writeoff.dto';

@Controller('writeoffs')
export class WriteoffsController {
  constructor(private readonly writeoffsService: WriteoffsService) {}

  @Post()
  create(@Body() createWriteoffDto: CreateWriteoffDto) {
    return this.writeoffsService.create(createWriteoffDto);
  }

  @Get()
  findAll() {
    return this.writeoffsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.writeoffsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWriteoffDto: UpdateWriteoffDto) {
    return this.writeoffsService.update(+id, updateWriteoffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.writeoffsService.remove(+id);
  }
}
