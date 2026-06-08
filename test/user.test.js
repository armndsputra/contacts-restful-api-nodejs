import supertes from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";
import { prismaClient } from "../src/app/database.js";

describe("POST /api/register", () => {
	afterEach(async () => {
		// Clean up the test user after each test
		await prismaClient.user.deleteMany({
			where: {
				username: "adipati suryanegara",
			},
		});
	});

	it("should register a new user", async () => {
		const response = await supertes(web).post("/api/register").send({
			username: "adipati suryanegara",
			password: "testpassword",
			name: "Adipati Suryanegara",
		});

		logger.info("Response: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("adipati suryanegara");
		expect(response.body.data.name).toBe("Adipati Suryanegara");
		expect(response.body.data.password).toBeUndefined();
	});
});
