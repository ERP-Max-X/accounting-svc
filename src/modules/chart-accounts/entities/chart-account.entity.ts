import { BasedEntity } from '@/common/based.entity';
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

@Entity({ tableName: 'chart_accounts' })
export class ChartAccountEntity extends BasedEntity {
  @Property()
  code: string;

  @ManyToOne(() => ChartAccountEntity, { nullable: true })
  parent?: ChartAccountEntity;

  @OneToMany(() => ChartAccountEntity, (chart) => chart.parent)
  children = new Collection<ChartAccountEntity>(this);

  @Property()
  creator?: number;

  @Property()
  updater?: number;
}
