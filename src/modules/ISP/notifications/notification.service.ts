import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import {
  EmailNotification,
  SMSNotification,
  PushNotification,
} from './notification.interfaces';

AWS.config.update({ region: 'us-east-1' });

@Injectable()
export class NotificationService {
  private ses = new AWS.SES({ apiVersion: '2010-12-01' });
  private sns = new AWS.SNS({ apiVersion: '2010-03-31' });

  async sendEmail(notification: EmailNotification): Promise<any> {
    const params = {
      Destination: {
        ToAddresses: [notification.to],
      },
      Message: {
        Body: {
          Text: { Data: notification.body },
        },
        Subject: { Data: notification.subject },
      },
      Source: 'your-email@example.com',
    };

    try {
      return await this.ses.sendEmail(params).promise();
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }

  async sendSMS(notification: SMSNotification): Promise<any> {
    const params = {
      Message: notification.message,
      PhoneNumber: notification.phoneNumber,
    };

    try {
      return await this.sns.publish(params).promise();
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Error sending SMS');
    }
  }

  async sendPushNotification(notification: PushNotification): Promise<any> {
    const params = {
      Message: notification.message,
      TargetArn: notification.targetArn,
    };

    try {
      return await this.sns.publish(params).promise();
    } catch (error) {
      console.error('Error sending push notification:', error);
      throw new Error('Error sending push notification');
    }
  }
}
