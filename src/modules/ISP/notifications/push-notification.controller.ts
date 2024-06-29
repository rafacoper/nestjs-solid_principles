import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { PushNotification } from './notification.interfaces';

@Controller('push-notification')
export class PushNotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendPushNotification(
    @Body() notification: PushNotification,
  ): Promise<any> {
    return this.notificationService.sendPushNotification(notification);
  }
}
