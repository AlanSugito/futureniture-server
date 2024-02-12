import Joi from 'joi';

const credentialSchema = Joi.object({
  email: Joi.string().required().email().max(250).messages({
    'string.email': 'Email is not a valid email format!',
    'string.empty': 'Email is a required field!',
  }),
  password: Joi.string().required().min(6).messages({
    'string.min': 'Password must be at least 6 character!',
    'string.empty': 'Password is a required field!',
  }),
});

export default credentialSchema;
