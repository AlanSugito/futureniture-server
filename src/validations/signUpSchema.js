import Joi from 'joi';

const signUpSchema = Joi.object({
  full_name: Joi.string().required().max(250).messages({
    'string.empty': 'Full name is a required field!',
  }),
  phone: Joi.string()
    .required()
    .alphanum()
    .max(13)
    .messages({'string.empty': 'Phone number is a required field!'}),
  address: Joi.string().optional().empty(''),
  email: Joi.string().required().email().max(250).messages({
    'string.email': 'Email is not a valid email format!',
    'string.empty': 'Email is a required field!',
  }),
  password: Joi.string().required().min(6).messages({
    'string.min': 'Password must be at least 6 character!',
    'string.empty': 'Password is a required field!',
  }),
});

export default signUpSchema;
