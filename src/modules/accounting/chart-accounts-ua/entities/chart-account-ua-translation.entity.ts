import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ChartAccountsUaEntity } from '@/modules/accounting/chart-accounts-ua/entities/chart-accounts-ua.entity';

@Entity({ tableName: 'chart_account_ua_translations' })
export class ChartAccountUaTranslationEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  lang!: string;

  @Property()
  name!: string;

  @ManyToOne(() => ChartAccountsUaEntity, {
    nullable: false,
  })
  chartAccount!: ChartAccountsUaEntity;
}
