import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChartAccountsUaService } from './chart-accounts-ua.service';
import { CreateChartAccountsUaDto } from './dto/create-chart-accounts-ua.dto';
import { UpdateChartAccountsUaDto } from './dto/update-chart-accounts-ua.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chart of Accounts Офіційний план рахунків + МСФЗ для України')
@Controller('accounting/chart-accounts-ua')
export class ChartAccountsUaController {
  constructor(
    private readonly chartAccountsUaService: ChartAccountsUaService,
  ) {}

  @Post()
  create(@Body() createChartAccountsUaDto: CreateChartAccountsUaDto) {
    return this.chartAccountsUaService.create(createChartAccountsUaDto);
  }

  @Get()
  findAll() {
    return this.chartAccountsUaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartAccountsUaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChartAccountsUaDto: UpdateChartAccountsUaDto,
  ) {
    return this.chartAccountsUaService.update(+id, updateChartAccountsUaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartAccountsUaService.remove(+id);
  }
}
