import {
	createTestUser,
	removeTest,
	removeTestContact,
	createTestContact,
	getTestContact,
	createManyTestContact,
	removeAllTestAddress,
} from "./test-util.js";
import supertes from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

describe("Address Service", () => {
	beforeAll(async () => {
		await createTestUser();
		await createTestContact();
	});

	// afterAll(async () => {
	//     await removeTest();
	// 	await removeAllTestAddress();
	// 	await removeTestContact();
	// });

	afterAll(async () => {
		await removeAllTestAddress();
		await removeTestContact();
		await removeTest();
	});

	it("should create an address for a contact", async () => {
		const contact = await getTestContact();
		// console.log("Contact ID: ", contact.id);
		const response = await supertes(web)
			.post(`/api/contacts/${contact.id}/addresses`)
			.set("Authorization", "testtoken")
			.send({
				street: "123 Main St",
				city: "Anytown",
				provence: "Anystate",
				postal_code: "12345",
				country: "USA",
			});

		logger.info("Response Create an address: ", response.body);

		expect(response.status).toBe(201);
		// expect(response.body).toHaveProperty("id");
		// expect(response.body.street).toBe("123 Main St");
		// expect(response.body.city).toBe("Anytown");
		// expect(response.body.provence).toBe("Anystate");
		// expect(response.body.postal_code).toBe("12345");
		// expect(response.body.country).toBe("USA");
	});
});
