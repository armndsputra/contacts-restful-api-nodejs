import { validate } from "../validation/validation.js";
import { registerValidation } from "../validation/register-validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";

export const registerService = async (request) => {
	// Validasi input menggunakan Joi
	// validate by joi
	const user = validate(registerValidation, request);

	const countUser = await prismaClient.user.count({
		where: {
			username: user.username,
		},
	});

	if (countUser === 1) {
		throw new ResponseError(400, "username already exists");
	}

	user.password = await bcrypt.hash(user.password, 10);

	return prismaClient.user.create({
		data: user,
		select: {
			username: true,
			// password: true, // jangan kembalikan password
			name: true,
		},
	});
};

