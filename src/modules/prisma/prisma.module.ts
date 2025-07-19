import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaPgService } from './services/prisma-pg/prisma-pg.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [PrismaService, PrismaPgService],
  exports: [PrismaService, PrismaPgService],
})
export class PrismaModule {}
