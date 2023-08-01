import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email().required().min(5).max(155),
  contactNumber: Joi.string().required().max(10),
  userType: Joi.string().required().valid("seeker", "provider"),
  personName: Joi.string().min(3).max(155),
  organizationName: Joi.string().min(3).max(155),
  password: Joi.string().required().min(4).max(25),
});
