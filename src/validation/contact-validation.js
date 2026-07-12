import Joi from "joi";

const createContactValidation = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().max(30).required(),
});

const getContactValidation = Joi.number().positive().required();

const updateContactValidation = Joi.object({
    id: Joi.number().positive().required(),
    first_name: Joi.string().max(50).optional(),
    last_name: Joi.string().max(50).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().max(30).optional(),
});

export {
    createContactValidation,
    getContactValidation,
    updateContactValidation,
}