import { BasedEntity } from '@/common/based.entity';
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ChartAccountUaTranslationEntity } from '@/modules/accounting/chart-accounts-ua/entities/chart-account-ua-translation.entity';

@Entity({ tableName: 'chart_accounts_ua' })
export class ChartAccountsUaEntity extends BasedEntity {
  @Property()
  code: string;

  @ManyToOne(() => ChartAccountsUaEntity, { nullable: true })
  parent?: ChartAccountsUaEntity;

  @OneToMany(() => ChartAccountsUaEntity, (chart) => chart.parent)
  children = new Collection<ChartAccountsUaEntity>(this);

  @Property()
  creator?: number;

  @Property()
  updater?: number;

  @OneToMany(() => ChartAccountUaTranslationEntity, (t) => t.chartAccount, {})
  translations = new Collection<ChartAccountUaTranslationEntity>(this);
}
