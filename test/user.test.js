import supertes from "supertest";
import bcrypt from "bcrypt";

import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

import { removeTest, createTestUser, getTestUser } from "./test-util.js";

describe("POST /api/register", () => {
	it("should register a new user", async () => {
		// Make a POST request to the registration endpoint
		const response = await supertes(web).post("/api/register").send({
			username: "adipati",
			password: "testpassword",
			name: "Adipati Suryanegara",
		});

		logger.info("Response Register: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("adipati");
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

		logger.info("Response Register: ", response.body);
		// console.log("Response: ", response.body);

		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should reject if username already exists", async () => {
		// Make a POST request to the registration endpoint
		let response = await supertes(web).post("/api/register").send({
			username: "adipati",
			password: "testpassword",
			name: "Adipati Suryanegara",
		});

		logger.info("Response Register: ", response.body);
		// console.log("Response: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("adipati");
		expect(response.body.data.name).toBe("Adipati Suryanegara");
		expect(response.body.data.password).toBeUndefined();

		response = await supertes(web).post("/api/register").send({
			username: "adipati",
			password: "testpassword",
			name: "Adipati Suryanegara",
		});

		logger.info("Response Register: ", response.body);

		expect(response.status).toBe(400);
		// keyword errors in middle of response body
		expect(response.body.errors).toBeDefined();
	});

	afterEach(async () => {
		// Clean up the test user after each test
		await removeTest();
		// console.log("Test user removed");
	});
});

describe("POST /api/login", () => {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		// Clean up the test user after each test
		await removeTest();
		// console.log("Test user removed");
	});

	// test login with valid credentials
	it("should login a user", async () => {
		const response = await supertes(web).post("/api/login").send({
			username: "adipati",
			password: "testpassword",
		});

		// console.log("------------------------------");
		logger.info("Response Login: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.token).toBeDefined();
		expect(response.body.data.token).not.toBe("testtoken");
	});

	// test login with invalid credentials
	it("should reject if request is invalid", async () => {
		const response = await supertes(web).post("/api/login").send({
			username: "",
			password: "",
		});

		logger.info("Response Login: ", response.body);
		// console.log(response.status);

		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	// test login with invalid password
	it("should reject if username or password is invalid", async () => {
		const response = await supertes(web).post("/api/login").send({
			username: "adipati",
			password: "wrongpassword",
		});

		logger.info("Response Login: ", response.body);

		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

// testing get current user with token
describe("GET /api/users/current", () => {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		// Clean up the test user after each test
		await removeTest();
		// console.log("Test user removed");
	});

	it("should return the current user", async () => {
		const response = await supertes(web)
			.get("/api/users/current")
			.set("Authorization", "testtoken");

		logger.info("Response Current User: ", response.body);
		// console.log("Response Current User: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("adipati");
		expect(response.body.data.name).toBe("Adipati Suryanegara");
	});

	// test get current user with invalid token
	it("should reject if token is invalid", async () => {
		const response = await supertes(web)
			.get("/api/users/current")
			.set("Authorization", "invalidtoken");

		logger.info("Response Current User: ", response.body);
		// console.log("Response Current User: ", response.body);

		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});


// update current user with token
describe("PATCH /api/users/current", () => {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		// Clean up the test user after each test
		await removeTest();
		// console.log("Test user removed");
	});

	it("should update the current name and password", async () => {
		const response = await supertes(web)
			.patch("/api/users/current")
			.set("Authorization", "testtoken")
			.send({
				name: "Adipati Suryanegara Updated",
				password: "newpassword",
			});

		logger.info("Response Update User: ", response.body);
		// console.log("Response Update User: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("adipati");
		expect(response.body.data.name).toBe("Adipati Suryanegara Updated");

		// check if password is updated
		const user = await getTestUser();
		expect(await bcrypt.compare("newpassword", user.password)).toBe(true);
	});

	it ("should reject if token is invalid", async () => {
		const response = await supertes(web)
			.patch("/api/users/current")
			.set("Authorization", "invalidtoken")
			.send({
				name: "Adipati Suryanegara Updated",
				password: "newpassword",
			});

		logger.info("Response Update User: ", response.body);
		// console.log("Response Update User: ", response.body);

		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it ("should update name only if password is not provided", async () => {
		const response = await supertes(web)
			.patch("/api/users/current")
			.set("Authorization", "testtoken")
			.send({
				name: "Adipati Suryanegara Updated Again",
			});

		logger.info("Response Update User: ", response.body);
		// console.log("Response Update User: ", response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("adipati");
		expect(response.body.data.name).toBe("Adipati Suryanegara Updated Again");

		// check if password is not updated
		const user = await getTestUser();
		expect(await bcrypt.compare("testpassword", user.password)).toBe(true);
	});
	
});
