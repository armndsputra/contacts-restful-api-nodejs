import supertes from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

 import { removeTest } from "./test-util.js";


describe("POST /api/register", () => {

	

	it("should register a new user", async () => {
		// Make a POST request to the registration endpoint
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

	it("should reject if request is invalid", async () => {
		// Make a POST request to the registration endpoint
		const response = await supertes(web).post("/api/register").send({
			username: "",
			password: "",
			name: "",
		});

		logger.info("Response: ", response.body);
		// console.log("Response: ", response.body);

		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should reject if username already exists", async () => {
		// Make a POST request to the registration endpoint
		let response = await supertes(web).post("/api/register").send({
			username: "adipati suryanegara",
			password: "testpassword",
			name: "Adipati Suryanegara",
		});

		logger.info("Response: ", response.body);
		// console.log("Response: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("adipati suryanegara");
		expect(response.body.data.name).toBe("Adipati Suryanegara");
		expect(response.body.data.password).toBeUndefined();

		response = await supertes(web).post("/api/register").send({
			username: "adipati suryanegara",
			password: "testpassword",
			name: "Adipati Suryanegara",
		});

		logger.info("Response: ", response.body);

		expect(response.status).toBe(400);
		// keyword errors in middle of response body
		expect(response.body.errors).toBeDefined();

	});

	afterEach(async () => {
		// Clean up the test user after each test
		await removeTest();
		console.log("Test user removed");
	});

});
