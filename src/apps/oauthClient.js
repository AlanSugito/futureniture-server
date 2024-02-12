import {google} from 'googleapis';
import configs from '../configs/index.js';

const oauth2Client = new google.auth.OAuth2({
  clientId: configs.CLIENT_ID,
  clientSecret: configs.CLIENT_SECRET,
  redirectUri: 'http://localhost:5000/users/auth/login/google/callback',
});

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const oauthUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

export {oauth2Client, oauthUrl};
