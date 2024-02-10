import {config} from 'dotenv';

config();

const configs = {
  PORT: process.env.PORT ? process.env.PORT : 5000,
  AT_SECRET: process.env.AT_SECRET,
  RT_SECRET: process.env.RT_SECRET,
  EMAIL_PASS: process.env.EMAIL_PASS,
};

export default configs;
