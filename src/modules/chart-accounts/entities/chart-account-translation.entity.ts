import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ChartAccountEntity } from '@/modules/chart-accounts/entities/chart-account.entity';

@Entity({ tableName: 'chart_account_translations' })
export class ChartAccountTranslationEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  lang!: string;

  @Property()
  name!: string;

  @ManyToOne(() => ChartAccountEntity, {
    nullable: false,
  })
  chartAccount!: ChartAccountEntity;
}
