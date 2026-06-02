import { registerService} from "../service/register-service.js";

export const registerController = async (req, res, next) => {
	try {
		const result = await registerService(req.body);
		// console.log(result);
		res.status(200).json({
			data: result,
		});
	} catch (error) {
		return next(error);
	}
};
