import { Module } from '@nestjs/common';
import { IncomingsService } from './incomings.service';
import { IncomingsController } from './incomings.controller';

@Module({
  controllers: [IncomingsController],
  providers: [IncomingsService],
})
export class IncomingsModule {}
