import { validate } from "../validation/validation.js";
import { createAddressValidation } from "../validation/address-validation.js";

import { getContactValidation } from "../validation/contact-validation.js";

import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, contactId, request) => {
	contactId = await validate(getContactValidation, contactId);
	// console.log(user.username, contactId);
	const totalContactDatabase = await prismaClient.contact.count({
		where: {
			username: user.username,
			id: contactId,
		},
	});

	// console.log("Total Contact Database: ", totalContactDatabase);

	if (totalContactDatabase !== 1) {
		throw new ResponseError(404, "Contact not found");
	}

	const address = await validate(createAddressValidation, request);
	address.contact_id = contactId;

	return prismaClient.addresess.create({
		data: address,
		select: {
			id: true,
			street: true,
			city: true,
			provence: true,
			postal_code: true,
			country: true,
		},
	});	
};

export default {
	create,
};
