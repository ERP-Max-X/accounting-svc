import { Module } from '@nestjs/common';
import { OutgoingsService } from './outgoings.service';
import { OutgoingsController } from './outgoings.controller';

@Module({
  controllers: [OutgoingsController],
  providers: [OutgoingsService],
})
export class OutgoingsModule {}
