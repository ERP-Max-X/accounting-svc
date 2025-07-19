import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/postgres/client';
import { ObserverPg } from '@/modules/prisma/observers/observer-pg';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { pgExtension } from '@/modules/prisma/extensions/pg.extension';

@Injectable()
export class PrismaPgService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  //
  protected readonly logger = new Logger(PrismaPgService.name);

  constructor(private readonly event: EventEmitter2) {
    super();
  }

  //
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database');
      this.use(
        async (params, next) =>
          await new ObserverPg(params, next, this.event, this).boot(),
      );
    } catch (error) {
      this.logger.error('Failed to connect to the database', error);
    }
  }

  use(cb: Prisma.Middleware): void {
    this.$use(cb);
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Successfully disconnected from the database');
    } catch (error) {
      this.logger.error('Failed to disconnect from the database', error);
    }
  }

  get extend() {
    return this.$extends(pgExtension);
  }
}
