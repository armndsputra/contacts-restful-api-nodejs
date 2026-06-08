import { registerService} from "../service/register-service.js"; // imprt from service folder

export const registerController = async (req, res, next) => {
	try {
		console.log(req.body);
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
