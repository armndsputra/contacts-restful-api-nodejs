import Joi from "joi";

const createAddressValidation = Joi.object({
  street: Joi.string().max(255).required(),
  city: Joi.string().max(100).required(),
  provence: Joi.string().max(100).required(),
  postal_code: Joi.string().max(20).required(),
  country: Joi.string().max(100).required(),
});

const getAddressValidation = Joi.number().min(1).positive().required();

const updateAddressValidation = Joi.object({
  id : Joi.number().min(1).positive().required(),
  street: Joi.string().max(255).required(),
  city: Joi.string().max(100).required(),
  provence: Joi.string().max(100).required(),
  postal_code: Joi.string().max(20).required(),
  country: Joi.string().max(100).required(),
})

export { createAddressValidation, getAddressValidation, updateAddressValidation };