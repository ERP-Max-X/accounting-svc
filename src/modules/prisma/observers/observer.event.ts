export class ObserverEvent {
  entity: any;
  entityOld?: any;

  constructor(init?: ObserverEvent) {
    Object.assign(this, init);
  }
}
