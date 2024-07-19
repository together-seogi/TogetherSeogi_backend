import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { config } from 'dotenv';
config();

let env = process.env;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${env.HTTP_PROTOCOL}://${env.DOMAIN}${env.GOOGLE_REDIRECT_PARAM}`,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const user = await this.authService.validateUser({
      providerData: {
        email: profile.emails[0].value,
        name: profile.displayName,
        uid: profile.id
      },
      profilePhoto: profile.photos[0].value
    });
    console.log('Validate');
    console.log(user);
    return user || null;
  }
}
