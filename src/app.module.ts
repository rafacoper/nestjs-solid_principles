import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/SRP/products/products.module';
import { OrdersModule } from './modules/SRP/orders/orders.module';
import { LSPOrdersModule } from './modules/LSP/orders/orders.module';
import { StorageModule } from './modules/DIP/storage/storage.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    LSPOrdersModule,
    StorageModule.forRoot('s3'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
