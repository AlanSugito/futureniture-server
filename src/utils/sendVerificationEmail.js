import transporter from '../apps/transporter.js';
import configs from '../configs/index.js';
import Cryptographer from './Cryptographer.js';
import {APIError} from './Error.js';

const sendEmailVerification = async (email) => {
  try {
    const token = Cryptographer.generateToken(
      {email},
      configs.VERIFY_EMAIL_KEY,
      '300s'
    );
    await transporter.sendMail({
      from: 'alandev75@outlook.com',
      subject: 'Email Verification',
      to: email,
      html: `This link expired in 5 minutes<br> link: http://localhost:5000/users/auth/verify/email?token=${token}`,
      repyTo: 'noreply.alandev75@outlook.com',
    });
  } catch (error) {
    throw APIError.parseError(error);
  }
};

export default sendEmailVerification;
