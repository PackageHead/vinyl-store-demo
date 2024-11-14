import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL:
        configService.get('GOOGLE_CALLBACK_URL') ||
        'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { emails, firstName, lastName } = profile;
    const email = emails[0].value;
    console.log('Google profile:', profile);
    const user = await this.authService.findOrCreateGoogleUser(
      email,
      firstName,
      lastName,
    );
    console.log('User from google.strategy.validate: ', user);
    return user;
  }
}
