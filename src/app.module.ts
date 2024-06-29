import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './modules/DIP/storage/storage.module';
import { NotificationModule } from './modules/ISP/notifications/notification.module';
import { NotificationService } from './modules/ISP/notifications/notification.service';

@Module({
  imports: [StorageModule, NotificationModule],
  controllers: [AppController, NotificationService],
  providers: [AppService],
})
export class AppModule {}
