import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OutgoingsService } from './outgoings.service';
import { CreateOutgoingDto } from './dto/create-outgoing.dto';
import { UpdateOutgoingDto } from './dto/update-outgoing.dto';

@Controller('outgoings')
export class OutgoingsController {
  constructor(private readonly outgoingsService: OutgoingsService) {}

  @Post()
  create(@Body() createOutgoingDto: CreateOutgoingDto) {
    return this.outgoingsService.create(createOutgoingDto);
  }

  @Get()
  findAll() {
    return this.outgoingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outgoingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutgoingDto: UpdateOutgoingDto) {
    return this.outgoingsService.update(+id, updateOutgoingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outgoingsService.remove(+id);
  }
}
