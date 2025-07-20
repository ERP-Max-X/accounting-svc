import { Migration } from '@mikro-orm/migrations';

export class Migration20250720100526 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create table "chart_account_translations"
                 (
                   "id"               serial primary key,
                   "lang"             varchar(255) not null,
                   "name"             varchar(255) not null,
                   "chart_account_id" int          not null
                 );`);

    this.addSql(`alter table "chart_account_translations"
      add constraint "chart_account_translations_chart_account_id_foreign" foreign key ("chart_account_id") references "chart_accounts" ("id") on update no action on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "chart_account_translations" cascade;`);
  }
}
