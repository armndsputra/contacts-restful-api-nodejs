import { validate } from "../validation/validation.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js";

import { getContactValidation } from "../validation/contact-validation.js";

import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";

// check if contact exists for the user, if not throw error
const checkContactExists = async (user, contactId) => {
	contactId = await validate(getContactValidation, contactId);
	const totalContactDatabase = await prismaClient.contact.count({
		where: {
			username: user.username,
			id: contactId,
		},
	});

	if (totalContactDatabase !== 1) {
		throw new ResponseError(404, "Contact not found");
	}

	return contactId;
};

const create = async (user, contactId, request) => {
	contactId = await checkContactExists(user, contactId);

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
			contact_id: true,
		},
	});	
};

const get = async (user, contactId, addressId) => {
	contactId = await checkContactExists(user, contactId);

	addressId = await validate(getAddressValidation, addressId);
	
	const address = await prismaClient.addresess.findUnique({
		where: {
			id: addressId,
			contact_id: contactId,
		},
		select: {
			id: true,
			street: true,
			city: true,
			provence: true,
			postal_code: true,
			country: true,
			contact_id: true,
		},
	});

	if (!address) {
		throw new ResponseError(404, "Address not found");
	}

	return address;
}

// update address for a contact, if contact or address not found throw error
const update = async (user, contactId, request) => {

	contactId = await checkContactExists(user, contactId);
	const address = await validate(updateAddressValidation, request);

	const totalAddressDatabase = await prismaClient.addresess.count({
		where: {
			id: address.id,
			contact_id: contactId,
		},
	});

	if (totalAddressDatabase !== 1) {
		throw new ResponseError(404, "Address not found");
	}

	return prismaClient.addresess.update({
		where: {
			id: address.id,
		},
		data: {
			street: address.street,
			city: address.city,
			provence: address.provence,
			postal_code: address.postal_code,
			country: address.country,
		},
		select: {
			id: true,
			street: true,
			city: true,
			provence: true,
			postal_code: true,
			country: true,
			contact_id: true,
		},
	});
}

const remove = async (user, contactId, addressId) => {
	contactId = await checkContactExists(user, contactId);
	addressId = await validate(getAddressValidation, addressId);

	const totalAddressDatabase = await prismaClient.addresess.count({
		where: {
			id: addressId,
			contact_id: contactId,
		},
	});

	// console.log("Total Address Database: ", totalAddressDatabase);

	if (totalAddressDatabase !== 1) {
		throw new ResponseError(404, "Address not found");
	}

	return prismaClient.addresess.delete({
		where: {
			id: addressId,
		}
		,select: {
			id: true,
			street: true,
			city: true,
			provence: true,
			postal_code: true,
			country: true,
			contact_id: true,
		}
	});
}

const list = async (user, contactId) => {
	contactId = await checkContactExists(user, contactId);
	// console.log("Contact ID: ", contactId);
	const addresses = await prismaClient.addresess.findMany({
		where: {
			contact_id: contactId,
		},
		select: {
			id: true,
			street: true,
			city: true,
			provence: true,
			postal_code: true,
			country: true,
			contact_id: true,
		},
	});

	// console.log("Addresses: ", addresses);
	return addresses;
}


export default {
	create, get, update, remove, list
};
