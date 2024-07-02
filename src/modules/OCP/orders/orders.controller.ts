import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IsNumber } from 'class-validator';
import { PaymentService } from '../payment/payment.service';
import {
  PAYMENT_METHOD,
  CreditCardGateway,
  PayPalGateway,
  BitcoinGateway,
  ApplePayGateway,
} from '../payment/payment.gateway';

class SubmitOrderDto {
  @IsNumber()
  productId: number;
}

@Controller('/orders')
export class OrdersController {
  constructor(
    private paymentService: PaymentService,
    private readonly ordersService: OrdersService,
  ) {
    this.paymentService.registerPaymentGateway(
      PAYMENT_METHOD.CREDIT_CARD,
      new CreditCardGateway(),
    );
    this.paymentService.registerPaymentGateway(
      PAYMENT_METHOD.PAYPAL,
      new PayPalGateway(),
    );
    this.paymentService.registerPaymentGateway(
      PAYMENT_METHOD.Bitcoin,
      new BitcoinGateway(),
    );
    this.paymentService.registerPaymentGateway(
      PAYMENT_METHOD.APPLE_PAY,
      new ApplePayGateway(),
    );
  }

  @Post('/submit')
  async submitOrder(@Body() submitOrderDto: SubmitOrderDto) {
    const { productId } = submitOrderDto;
    const order = await this.ordersService.submitOrder({ productId });

    // Assuming you want to process payment immediately
    await this.paymentService.processPayment(order, PAYMENT_METHOD.CREDIT_CARD);

    return order;
  }
}
