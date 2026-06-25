import {
	registerService,
	loginService,
	getUserByUsernameService,
} from "../service/user-service.js"; // imprt from service folder

export const registerController = async (req, res, next) => {
	try {
		// console.log(req.body);
		// return
		const result = await registerService(req.body);
		// console.log(result);
		res.status(200).json({
			data: result,
		});
	} catch (error) {
		return next(error);
	}
};

export const loginController = async (req, res, next) => {
	try {
		const result = await loginService(req.body);
		res.status(200).json({
			data: result,
		});
	} catch (error) {
		return next(error);
	}
};

export const getUserController = async (req, res, next) => {
	try {
		const username = req.user.username;
		const result = await getUserByUsernameService(username);
		// console.log("result: ", result);
		res.status(200).json({
			data: result,
		});
	} catch (error) {
		return next(error);
	}
};
