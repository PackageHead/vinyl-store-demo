import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-checkout-session')
  @ApiOperation({ summary: 'Create a checkout session for Stripe payment' })
  @ApiResponse({
    status: 201,
    description: 'Checkout session created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to create checkout session.',
  })
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    try {
      const session = await this.orderService.createCheckoutSession(
        createCheckoutSessionDto.UserId,
        createCheckoutSessionDto.priceId,
      );
      return session;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to create checkout session');
    }
  }
}
