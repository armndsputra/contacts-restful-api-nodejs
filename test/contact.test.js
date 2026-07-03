import { createTestUser, removeTest, removeTestContact } from "./test-util.js";
import supertes from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

describe("Contact API", () => {
	beforeAll(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeTestContact();
		await removeTest();
	});

	it("should create a new contact", async () => {
		const response = await supertes(web)
			.post("/api/contacts")
			.set("Authorization", `testtoken`)
			.send({
				first_name: "John Doe",
				last_name: "Smith",
				email: "john.doe@example.com",
				phone: "1234567890",
			});

		logger.info("Response Create Contact: ", response.body);

		expect(response.status).toBe(201);
		expect(response.body.data).toHaveProperty("id");
		expect(response.body.data.first_name).toBe("John Doe");
		expect(response.body.data.last_name).toBe("Smith");
		expect(response.body.data.email).toBe("john.doe@example.com");
		expect(response.body.data.phone).toBe("1234567890");
	});
});
