import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ChartAccountUaSeeder } from '@/seeders/ChartAccountUaSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [ChartAccountUaSeeder]);
  }
}
