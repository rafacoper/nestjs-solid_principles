// sms.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SMSNotification } from './notification.interfaces';

@Controller('sms')
export class SMSController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendSMS(@Body() notification: SMSNotification): Promise<any> {
    return this.notificationService.sendSMS(notification);
  }
}
