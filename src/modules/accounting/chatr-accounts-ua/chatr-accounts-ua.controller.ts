import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatrAccountsUaService } from './chatr-accounts-ua.service';
import { CreateChatrAccountsUaDto } from './dto/create-chatr-accounts-ua.dto';
import { UpdateChatrAccountsUaDto } from './dto/update-chatr-accounts-ua.dto';

@Controller('chatr-accounts-ua')
export class ChatrAccountsUaController {
  constructor(private readonly chatrAccountsUaService: ChatrAccountsUaService) {}

  @Post()
  create(@Body() createChatrAccountsUaDto: CreateChatrAccountsUaDto) {
    return this.chatrAccountsUaService.create(createChatrAccountsUaDto);
  }

  @Get()
  findAll() {
    return this.chatrAccountsUaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatrAccountsUaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatrAccountsUaDto: UpdateChatrAccountsUaDto) {
    return this.chatrAccountsUaService.update(+id, updateChatrAccountsUaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatrAccountsUaService.remove(+id);
  }
}
