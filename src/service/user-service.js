import { validate } from "../validation/validation";
import { registerUserValidation } from "../validation/user-validation";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import bcrypt from bcrypt

const register = async (request) => {
	const user = validate(registerUserValidation, request);

	const countUser = await prismaClient.user.count({
		where: {
			username: user.username,
		},
	});

	if (countUser === 1) {
		throw new ResponseError(400, "username already exists");
	}

    user.password = await bcrypt.hash(user.password, 10)

	return prismaClient.user.create({
		data: user,
		select: {
			username: true,
			password: true,
		},
	});

};
