// sale-pricing-strategy.service.ts
import { Injectable } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Injectable()
export class SalePricingStrategy implements PricingService {
  calculatePrice(basePrice: number): number {
    // Logic to calculate the sale price
    return basePrice * 0.8; // 20% discount
  }
}
