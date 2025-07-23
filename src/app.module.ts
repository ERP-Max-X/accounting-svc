import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ChartAccountsModule } from '@/modules/accounting/chart-accounts/chart-accounts.module';
import { UnitsModule } from './modules/mains/units/units.module';
import { ProductsModule } from './modules/mains/products/products.module';
import { CategoriesModule } from './modules/mains/categories/categories.module';
import { WarehousesModule } from './modules/mains/warehouses/warehouses.module';
import { BatchesModule } from './modules/mains/batches/batches.module';
import { StocksModule } from './modules/mains/stocks/stocks.module';
import { IncomingsModule } from './modules/documents/incomings/incomings.module';
import { OutgoingsModule } from './modules/documents/outgoings/outgoings.module';
import { MovementsModule } from './modules/documents/movements/movements.module';
import { WriteoffsModule } from './modules/documents/writeoffs/writeoffs.module';
import { JournalsModule } from './modules/accounting/journals/journals.module';
import { ChartAccountsUaModule } from './modules/accounting/chart-accounts-ua/chart-accounts-ua.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    UnitsModule,
    ProductsModule,
    CategoriesModule,
    WarehousesModule,
    BatchesModule,
    StocksModule,
    IncomingsModule,
    OutgoingsModule,
    MovementsModule,
    WriteoffsModule,
    JournalsModule,
    ChartAccountsModule,
    ChartAccountsUaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
