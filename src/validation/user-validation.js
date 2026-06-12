import Joi from "joi";

export const registerValidation = Joi.object({
	username: Joi.string().min(5).max(100).required(),
	password: Joi.string().min(6).required(),
	name: Joi.string().min(6).required(),
});

export const loginValidation = Joi.object({
	username: Joi.string().min(5).max(100).required(),
	password: Joi.string().min(6).required(),
});

