import { PartialType } from '@nestjs/swagger';
import { CreateChartAccountsUaDto } from './create-chart-accounts-ua.dto';

export class UpdateChartAccountsUaDto extends PartialType(CreateChartAccountsUaDto) {}
