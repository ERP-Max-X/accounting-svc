import { Migration } from '@mikro-orm/migrations';

export class Migration20250723170735 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create table "chart_accounts_ua"
                 (
                   "id"         serial primary key,
                   "code"       varchar(255) not null,
                   "parent_id"  int null,
                   "creator"    int null,
                   "updater"    int null,
                   "created_at" timestamptz  not null,
                   "updated_at" timestamptz  not null
                 );`);

    this.addSql(`create table "chart_account_ua_translations"
                 (
                   "id"               serial primary key,
                   "lang"             varchar(255) not null,
                   "name"             varchar(255) not null,
                   "chart_account_id" int          not null
                 );`);

    this.addSql(`alter table "chart_accounts_ua"
      add constraint "chart_accounts_ua_parent_id_foreign" foreign key ("parent_id") references "chart_accounts_ua" ("id") on update no action on delete cascade;`);

    this.addSql(`alter table "chart_account_ua_translations"
      add constraint "chart_account_ua_translations_chart_account_id_foreign" foreign key ("chart_account_id") references "chart_accounts_ua" ("id") on update no action on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "chart_accounts_ua" drop constraint "chart_accounts_ua_parent_id_foreign";`,
    );

    this.addSql(
      `alter table "chart_account_ua_translations" drop constraint "chart_account_ua_translations_chart_account_id_foreign";`,
    );

    this.addSql(`drop table if exists "chart_accounts_ua" cascade;`);

    this.addSql(
      `drop table if exists "chart_account_ua_translations" cascade;`,
    );
  }
}
