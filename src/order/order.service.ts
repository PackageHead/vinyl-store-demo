import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import Stripe from 'stripe';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
  private stripe: Stripe;

  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key is missing');
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-10-28.acacia',
    });
  }

  async createCheckoutSession(userId: string, priceId: string) {
    try {
      const user = await this.userService.getProfile(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (!userId || !priceId) {
        throw new HttpException(
          'User ID and Price ID are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const frontendUrl = this.configService.get<string>('FRONTEND_URL');
      if (!frontendUrl) {
        throw new Error('Frontend URL is missing');
      }

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${frontendUrl}/cancel`,
      });

      return { url: session.url };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new HttpException(
        'Failed to create checkout session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async handleWebhook(req: Request) {
    const endpointSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );
    const sig = req.headers['stripe-signature'];

    if (!endpointSecret || !sig) {
      throw new HttpException(
        'Webhook configuration is missing',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
