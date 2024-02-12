import Joi from 'joi';

const userProfileSchema = Joi.object({
  address: Joi.string().optional().empty(''),
  phone: Joi.string()
    .optional()
    .max(13)
    .message('Phone number max length is 13'),
  profile_img: Joi.string().optional(),
});

export default userProfileSchema;
