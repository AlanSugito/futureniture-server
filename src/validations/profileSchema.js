import Joi from 'joi';

const profileSchema = Joi.object({
  fullname: Joi.string().required().max(250).messages({
    'string.empty': 'Full name is a required field!',
  }),
  phone: Joi.string()
    .required()
    .alphanum()
    .max(13)
    .messages({'string.empty': 'Phone number is a required field!'}),
  address: Joi.string().optional().empty(''),
});

export default profileSchema;
