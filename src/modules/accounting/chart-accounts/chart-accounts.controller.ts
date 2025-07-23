import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChartAccountsService } from './chart-accounts.service';
import { CreateChartAccountDto } from './dto/create-chart-account.dto';
import { UpdateChartAccountDto } from './dto/update-chart-account.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Chart of Accounts IFRS')
@Controller('accounting/chart-accounts')
export class ChartAccountsController {
  constructor(private readonly chartAccountsService: ChartAccountsService) {}

  @ApiOperation({ summary: 'This action adds a new chartAccount' })
  @Post()
  create(@Body() createChartAccountDto: CreateChartAccountDto) {
    return this.chartAccountsService.create(createChartAccountDto);
  }

  @Get()
  findAll() {
    return this.chartAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartAccountsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChartAccountDto: UpdateChartAccountDto,
  ) {
    return this.chartAccountsService.update(+id, updateChartAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartAccountsService.remove(+id);
  }
}
