import bcrypt from "bcrypt";

import { validate } from "../validation/validation.js";
import { registerValidation } from "../validation/user-validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuidv4 } from 'uuid';

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
		throw new ResponseError(400, "username already exists"); // throw to error folder
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





export const loginService = async (request) => {
	// Validasi input menggunakan Joi
	const user = validate(registerValidation, request);

	const findUser = await prismaClient.user.findUnique({
		where: {
			username: user.username,
		},
	});

	if (!findUser) {
		throw new ResponseError(401, "invalid username or password");
	}

	const isPasswordValid = await bcrypt.compare(user.password, findUser.password);

	if (!isPasswordValid) {
		throw new ResponseError(401, "invalid username or password");
	}

	const token = uuidv4().toLocaleLowerCase();

	await prismaClient.user.update({
		where: {
			username: user.username,
		},
		data: {
			token,
		},
		select: {
			token: true,
		}
	});

	return {
		token,
	};
};
