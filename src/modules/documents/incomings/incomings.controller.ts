import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncomingsService } from './incomings.service';
import { CreateIncomingDto } from './dto/create-incoming.dto';
import { UpdateIncomingDto } from './dto/update-incoming.dto';

@Controller('incomings')
export class IncomingsController {
  constructor(private readonly incomingsService: IncomingsService) {}

  @Post()
  create(@Body() createIncomingDto: CreateIncomingDto) {
    return this.incomingsService.create(createIncomingDto);
  }

  @Get()
  findAll() {
    return this.incomingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncomingDto: UpdateIncomingDto) {
    return this.incomingsService.update(+id, updateIncomingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomingsService.remove(+id);
  }
}
