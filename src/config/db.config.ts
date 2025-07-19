import { ConfigService } from '@nestjs/config';
import { defineConfig } from '@mikro-orm/postgresql';

const configService = new ConfigService();

export const dbConfig = defineConfig({
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  user: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  dbName: configService.get<string>('POSTGRES_DB'),
  entities: ['dist/**/*.entity.js'], // або конкретні файли
  entitiesTs: ['src/**/*.entity.ts'],
  allowGlobalContext: true,
  schema: 'public', // за замовчуванням, буде замінюватись в рантаймі
});
