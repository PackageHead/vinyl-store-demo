import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendPaymentEmail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      from: this.configService.get<string>('EMAIL_USER'),
      to,
      subject,
      text,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
