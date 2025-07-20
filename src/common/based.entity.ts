import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class BasedEntity {
  @PrimaryKey()
  id!: number;

  @Property({ onCreate: () => new Date() })
  created_at: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at: Date = new Date();

  [OptionalProps]?: 'id' | 'created_at' | 'updated_at';
}
