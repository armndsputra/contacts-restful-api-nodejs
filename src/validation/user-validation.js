import Joi from "joi";

const registerUserValidation = Joi.object({
	username: Joi.string().min(10).max(100).required(),
	password: Joi.string().min(6).required(),
	name: Joi.string().min(6).required(),
});

export { registerUserValidation };
