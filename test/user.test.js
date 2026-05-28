import supertes from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";
import { prismaClient } from "../src/app/database.js";

describe("POST /api/users", () => {

	afterEach(async () => {
		// Clean up the test user after each test
		await prismaClient.user.deleteMany({
			where: {
				username: "ayuswtyawardani",
			},
		});
	});

	it("should register a new user", async () => {
		const response = await supertes(web).post("/api/users").send({
			username: "ayuswtyawardani",
			password: "testpassword",
            name: "ayu setyawardani",
		});

		logger.info("Response: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("ayuswtyawardani");
		expect(response.body.data.name).toBe("ayu setyawardani");
		expect(response.body.data.password).toBeUndefined();
	});
});
