import contactService from "../service/contact-service.js";

const create = async (req, res, next) => {
	try {
		const user = req.user;
		const request = req.body;

		const contact = await contactService.create(user, request);
		res.status(201).json({
			data: contact,
		});
	} catch (error) {
		next(error);
	}
};

const get = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = req.params.id;

		const contact = await contactService.get(user, contactId);
		res.status(200).json({
			data: contact,
		});
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = req.params.id;
		const request = req.body;
		request.id = contactId;

		const contact = await contactService.update(user, request);
		res.status(200).json({
			data: contact,
		});
	} catch (error) {
		next(error);
	}
};

const remove = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = req.params.id;

		await contactService.remove(user, contactId);
		res.status(204).json({
			message: "Contact deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const search = async (req, res, next) => {
	try {
		const user = req.user;
		const request = {
			name: req.params.name,
			email: req.params.email,
			phone: req.params.phone,
			page: req.params.page,
			size: req.params.size,
		};

		const result = await contactService.search(user, request);
		res.status(200).json({
			data: result.data,
			paging: result.paging,
		});
	} catch (error) {
		next(error);
	}
};

export default { create, get, update, remove, search };
