import { prismaClient } from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
	const token = req.get("Authorization");

	if (!token) {
		return res.status(401).json({ error: "Unauthorized" }).end();
	} else {
		const user = await prismaClient.user.findFirst({
			where: {
				token: token,
			},
		});

		if (!user) {
			return res.status(401).json({ errors: "Unauthorized" }).end();
		} else {
			// send username to req.user
			req.user = user;
			next();
		}
	}
};
