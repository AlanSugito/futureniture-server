import nodemailer from 'nodemailer';
import configs from '../configs/index.js';

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  debug: true,
  auth: {
    user: 'alandev75@outlook.com',
    pass: configs.EMAIL_PASS,
  },
});

export default transporter;
