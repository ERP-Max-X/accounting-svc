import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ChartAccountsUaEntity } from '@/modules/accounting/chart-accounts-ua/entities/chart-accounts-ua.entity';
import { ChartAccountUaTranslationEntity } from '@/modules/accounting/chart-accounts-ua/entities/chart-account-ua-translation.entity';
import { ChartAccounts } from '@/seeders/ChartAccounts';

export class ChartAccountUaSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.saveChartAccountsUaTree(em, ChartAccounts);
  }

  async saveChartAccountsUaTree(
    em: EntityManager,
    items: typeof ChartAccounts,
    parent?: ChartAccountsUaEntity,
  ) {
    for (const item of items) {
      const account = new ChartAccountsUaEntity();
      account.code = item.code;

      if (parent) {
        account.parent = parent;
      }

      for (const [locale, name] of Object.entries(item.translations)) {
        const translation = new ChartAccountUaTranslationEntity();
        translation.lang = locale;
        translation.name = name;
        translation.chartAccount = account;

        account.translations.add(translation);
      }

      em.persist(account); // відкладене збереження

      // рекурсивно зберігаємо дітей
      if (item.children && item.children.length > 0) {
        await this.saveChartAccountsUaTree(em, item.children as any, account);
      }
    }
  }
}
