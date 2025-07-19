import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/postgres/client';
import { EventsClasses } from './events-classes';
import { EventPayload } from '@/modules/prisma/interfaces/event-payload.interface';
import { PrismaPgService } from '@/modules/prisma/services/prisma-pg/prisma-pg.service';

export class ObserverPg {
  private static readonly EVENT_SUFFIX = 'Event';
  private static readonly UPDATED_SUFFIX = 'd';
  private static readonly UPDATE_ACTION = 'update';
  private static readonly DELETE_MANY_ACTION = 'deleteMany';

  constructor(
    private readonly params: Prisma.MiddlewareParams,
    private readonly next: (
      params: Prisma.MiddlewareParams,
    ) => Promise<unknown>,
    private readonly eventEmitter: EventEmitter2,
    private readonly prismaService: PrismaPgService,
  ) {}

  private readonly eventClasses = EventsClasses;

  public async boot(): Promise<unknown> {
    const action = this.capitalize(this.params.action);
    const baseEventName = this.params.model + action;

    this.emitBeforeEvent(baseEventName);

    const oldEntity = await this.fetchOldEntityIfNeeded();
    const result = await this.next(this.params);

    this.emitAfterEvent(baseEventName, result, oldEntity);

    return result;
  }

  private emitBeforeEvent(baseEventName: string): void {
    const beforeEventClass = `${baseEventName}${ObserverPg.EVENT_SUFFIX}`;
    const EventClass = this.findEventClass(beforeEventClass);

    if (EventClass) {
      const payload: EventPayload = { entity: this.params.args?.data ?? null };

      this.eventEmitter.emit(
        `${this.params.model}.${this.params.action}`,
        new EventClass(payload),
      );
    }
  }

  private emitAfterEvent(
    baseEventName: string,
    result: unknown,
    oldEntity?: Record<string, unknown>,
  ): void {
    const afterEventClass = `${baseEventName}${ObserverPg.UPDATED_SUFFIX}${ObserverPg.EVENT_SUFFIX}`;
    const EventClass = this.findEventClass(afterEventClass);

    if (EventClass) {
      const payload: EventPayload = { entity: result, entityOld: oldEntity };

      this.eventEmitter.emit(
        `${this.params.model}.${this.params.action}${ObserverPg.UPDATED_SUFFIX}`,
        new EventClass(payload),
      );
    }
  }

  private async fetchOldEntityIfNeeded(): Promise<any> {
    const model =
      this.prismaService[this.params.model as keyof PrismaPgService];

    if (this.params.action === ObserverPg.UPDATE_ACTION) {
      const entityId = this.params.args?.where?.id as number;
      return await model['findFirst']({
        where: { id: entityId },
      });
    }

    if (this.params.action === ObserverPg.DELETE_MANY_ACTION) {
      return await model['findMany']({
        where: this.params.args?.where as unknown as Record<string, unknown>,
      });
    }
    //
  }

  private findEventClass(className: string) {
    const index = this.eventClasses.findIndex(
      (value) => String(value['name']) === className,
    );
    return index !== -1 ? this.eventClasses[index] : undefined;
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
