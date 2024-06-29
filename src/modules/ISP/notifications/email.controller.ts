// email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailNotification } from './notification.interfaces';

@Controller('email')
export class EmailController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendEmail(@Body() notification: EmailNotification): Promise<any> {
    return this.notificationService.sendEmail(notification);
  }
}
