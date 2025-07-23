import { Module } from '@nestjs/common';
import { WriteoffsService } from './writeoffs.service';
import { WriteoffsController } from './writeoffs.controller';

@Module({
  controllers: [WriteoffsController],
  providers: [WriteoffsService],
})
export class WriteoffsModule {}
