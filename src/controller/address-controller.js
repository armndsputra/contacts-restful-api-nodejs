import addressService from "../service/address-service.js";

const create = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = req.params.contactId;
		const request = req.body;
		// console.log("Contact ID: ", contactId);
		const address = await addressService.create(user, contactId, request);

		res.status(201).json({
			data: address,
		});
	} catch (error) {
		next(error);
	}
};

const get = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = req.params.contactId;
		const addressId = req.params.addressId;
		// console.log("Contact ID: ", contactId);
		const address = await addressService.get(user, contactId, addressId);

		res.status(200).json({
			data: address,
		});
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = req.params.contactId;
		const request = req.body;
		// console.log("Contact ID: ", contactId);
		const addressId = req.params.addressId;
		request.id = addressId;
		const address = await addressService.update(user, contactId, request);

		res.status(200).json({
			data: address,
		});
	} catch (error) {
		next(error);
	}
};

const remove = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = req.params.contactId;
		const addressId = req.params.addressId;
		// console.log("Contact ID: ", contactId);
		await addressService.remove(user, contactId, addressId);
		// console.log("Result: ", result);
		res.status(200).json({
			data: "OK",
		});
	} catch (error) {
		next(error);
	}
};

const list = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = req.params.contactId;
		// console.log("Contact ID: ", contactId);
		const addresses = await addressService.list(user, contactId);
		// console.log("Addresses: ", addresses);
		res.status(200).json({
			data: addresses,
		});
	} catch (error) {
		next(error);
	}
};

export default {
	create,
	get,
	update,
	remove,
	list,
};
