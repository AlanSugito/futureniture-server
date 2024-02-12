import {config} from 'dotenv';

config();

const configs = {
  PORT: process.env.PORT ? process.env.PORT : 5000,
  AT_SECRET: process.env.AT_SECRET_KEY,
  RT_SECRET: process.env.RT_SECRET_KEY,
  EMAIL_PASS: process.env.EMAIL_PASS,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  API_KEY: process.env.API_KEY,
};

export default configs;
