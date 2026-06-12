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