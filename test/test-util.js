import { prismaClient } from "../src/app/database.js";

export const removeTest = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "adipati suryanegara",
        },
    });
};