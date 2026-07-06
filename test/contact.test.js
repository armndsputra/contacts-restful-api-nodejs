import { createTestUser, removeTest, removeTestContact, createTestContact, getTestContact } from "./test-util.js";
import supertes from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

describe("Contact API", () => {

	beforeAll(async () => {
		await createTestUser();
	});

	afterAll(async () => {
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

	it("should return 400 for invalid contact data", async () => {
		const response = await supertes(web)
			.post("/api/contacts")
			.set("Authorization", `testtoken`)
			.send({
				first_name: "",
				last_name: "Smith",
				email: "john.doe",
				phone: "1234567890",
			});

		logger.info("Response Invalid Contact: ", response.body);

		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	
});

// Get Contact API Test
describe("Get Contact API", () => {

	beforeAll(async () => {
		await createTestUser();
		await createTestContact();
	});

	afterAll(async () => {
		await removeTestContact();
		await removeTest();
	});

	it ("should get a contact by ID", async () => {

		const contact = await getTestContact();

		const response = await supertes(web)
			.get(`/api/contacts/${contact.id}`)
			.set("Authorization", `testtoken`);
		

		logger.info("Response Get Contact: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data).toHaveProperty("id");
		expect(response.body.data.first_name).toBe(contact.first_name);
		expect(response.body.data.last_name).toBe(contact.last_name);
		expect(response.body.data.email).toBe(contact.email);
		expect(response.body.data.phone).toBe(contact.phone);
		
	});

})