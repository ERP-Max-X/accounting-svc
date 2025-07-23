import { Injectable } from '@nestjs/common';
import { CreateChartAccountsUaDto } from './dto/create-chart-accounts-ua.dto';
import { UpdateChartAccountsUaDto } from './dto/update-chart-accounts-ua.dto';

@Injectable()
export class ChartAccountsUaService {
  create(createChartAccountsUaDto: CreateChartAccountsUaDto) {
    return 'This action adds a new chartAccountsUa';
  }

  findAll() {
    return `This action returns all chartAccountsUa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chartAccountsUa`;
  }

  update(id: number, updateChartAccountsUaDto: UpdateChartAccountsUaDto) {
    return `This action updates a #${id} chartAccountsUa`;
  }

  remove(id: number) {
    return `This action removes a #${id} chartAccountsUa`;
  }
}
