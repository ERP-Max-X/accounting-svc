import { defineConfig } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

const configService = new ConfigService();

export default defineConfig({
  driver: PostgreSqlDriver,
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  user: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  dbName: configService.get<string>('POSTGRES_DB'),
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    glob: '!(*.d).{js,ts}',
  },
  //extensions: [Migrator, EntityGenerator, SeedManager],
});
