import { Module } from '@nestjs/common';
import { ChartAccountsUaService } from './chart-accounts-ua.service';
import { ChartAccountsUaController } from './chart-accounts-ua.controller';

@Module({
  controllers: [ChartAccountsUaController],
  providers: [ChartAccountsUaService],
})
export class ChartAccountsUaModule {}
