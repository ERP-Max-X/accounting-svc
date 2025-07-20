import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ChartAccountsModule } from './modules/chart-accounts/chart-accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    ChartAccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
