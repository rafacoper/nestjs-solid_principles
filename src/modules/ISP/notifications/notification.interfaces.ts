export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
}

export interface SMSNotification {
  phoneNumber: string;
  message: string;
}

export interface PushNotification {
  userId: string;
  title: string;
  body: string;
}
