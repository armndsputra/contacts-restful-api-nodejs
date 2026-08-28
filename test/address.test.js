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

	// User masih direferensikan oleh Contact jadi harus dihapus dulu Contactnya baru Usernya, begitu juga dengan Address yang direferensikan oleh Contact, jadi harus dihapus dulu Addressnya baru Contactnya, baru Usernya.
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
		expect(response.body.data.contact_id).toBe(contact.id);
		expect(response.body.data.street).toBe("123 Main St");
		expect(response.body.data.city).toBe("Anytown");
		expect(response.body.data.provence).toBe("Anystate");
		expect(response.body.data.postal_code).toBe("12345");
		expect(response.body.data.country).toBe("USA");
	});

	it("rejects creating an address for a non-existent contact", async () => {
		const response = await supertes(web)
			.post(`/api/contacts/9999/addresses`)
			.set("Authorization", "testtoken")
			.send({
				street: "123 Main St",
				city: "Anytown",
				provence: "Anystate",
				postal_code: "12345",
				country: "USA",
			});

		logger.info(
			"Response Create an address for non-existent contact: ",
			response.body,
		);

		expect(response.status).toBe(404);
	});

	it("rejects creating an address with invalid data", async () => {
		const contact = await getTestContact();
		const response = await supertes(web)
			.post(`/api/contacts/${contact.id}/addresses`)
			.set("Authorization", "testtoken")
			.send({
				street: "123 Main St",
				city: "Anytown",
				provence: "Anystate",
				postal_code: "",
				country: "",
			});

		logger.info(
			"Response Create an address with invalid data: ",
			response.body,
		);

		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
		expect(response.body.errors.length).toBeGreaterThan(0);
	});
});
