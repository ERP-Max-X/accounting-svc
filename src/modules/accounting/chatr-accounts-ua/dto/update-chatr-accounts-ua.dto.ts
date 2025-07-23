import { PartialType } from '@nestjs/swagger';
import { CreateChatrAccountsUaDto } from './create-chatr-accounts-ua.dto';

export class UpdateChatrAccountsUaDto extends PartialType(CreateChatrAccountsUaDto) {}
