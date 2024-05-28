import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(@Inject('AUTH_SERVICE') private readonly userService: UserService) {
        super({
            clientID: '18778790621-jm6u15bdm1ugkkmcrnvpuqdk8te09ugi.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
       const user= this.userService.validateUser({
            email: emails[0].value,
            name: name.givenName+' '+name.familyName,
            profileImage: photos[0].value,
          token:  accessToken
        })
        return user||null;
       
    }
}