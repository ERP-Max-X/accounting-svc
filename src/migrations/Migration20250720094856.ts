import { Migration } from '@mikro-orm/migrations';

export class Migration20250720094856 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create table "chart_accounts"
                 (
                   "id"         serial primary key,
                   "parent_id"  int null,
                   "code"       varchar(255) not null,
                   "creator"    int null,
                   "updater"    int null,
                   "created_at" timestamptz  not null,
                   "updated_at" timestamptz  not null
                 );`);

    this.addSql(`alter table "chart_accounts"
      add constraint "chart_accounts_parent_id_foreign" foreign key ("parent_id") references "chart_accounts" ("id") on update no action on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "chart_accounts" drop constraint "chart_accounts_parent_id_foreign";`,
    );

    this.addSql(`drop table if exists "chart_accounts" cascade;`);
  }
}
