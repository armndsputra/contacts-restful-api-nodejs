import bcrypt from "bcrypt";

import { prismaClient } from "../src/app/database.js";

export const removeTest = async () => {
	await prismaClient.user.deleteMany({
		where: {
			username: "adipati",
		},
	});
};

export const createTestUser = async () => {
	return prismaClient.user.create({
		data: {
			username: "adipati",
			password: await bcrypt.hash("testpassword", 10), // hash password
			name: "Adipati Suryanegara",
			token: "testtoken",
		},
	});
};

export const getTestUser = async () => {
	return prismaClient.user.findUnique({
		where: {
			username: "adipati",
		},
	});
};

export const removeTestContact = async () => {
	await prismaClient.contact.deleteMany({
		where: {
			username: "adipati",
		},
	});
};

export const createTestContact = async () => {
	return prismaClient.contact.create({
		data: {
			first_name: "John Doe",
			last_name: "Smith",
			email: "john.doe@example.com",
			phone: "1234567890",
			username: "adipati",
		},
	});
};

export const createManyTestContact = async () => {
	for (let i = 1; i <= 20; i++) {
		await prismaClient.contact.create({
			data: {
				first_name: `John Doe ${i}`,
				last_name: `Smith ${i}`,
				email: `john.doe${i}@example.com`,
				phone: `1234567890${i}`,
				username: `adipati`,
			},
		});
	}
};

export const getTestContact = async () => {
	return prismaClient.contact.findFirst({
		where: {
			username: "adipati",
		},
	});
};
