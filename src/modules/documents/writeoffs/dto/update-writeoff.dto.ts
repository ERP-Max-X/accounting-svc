import { PartialType } from '@nestjs/swagger';
import { CreateWriteoffDto } from './create-writeoff.dto';

export class UpdateWriteoffDto extends PartialType(CreateWriteoffDto) {}
