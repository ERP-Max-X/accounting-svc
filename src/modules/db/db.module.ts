import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { dbConfig } from '@/config/db.config';

@Module({
  imports: [MikroOrmModule.forRoot(dbConfig)],
})
export class DbModule {}
