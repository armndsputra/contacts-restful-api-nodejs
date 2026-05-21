import { PrismaClient } from '@prisma/client'

import { logger } from "./logging.js";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
        {
            emit: "event",
            level: "error",
        },
        {
            emit: "event",
            level: "info",
        },
        {
            emit: "event",
            level: "warn",
        },
    ],
});

// Event handlers dengan format lebih baik
prismaClient.$on('error', (e) => {
    logger.error({
        type: 'Prisma Error',
        message: e.message,
        target: e.target,
        timestamp: e.timestamp
    });
});

prismaClient.$on('warn', (e) => {
    logger.warn({
        type: 'Prisma Warning',
        message: e.message,
        target: e.target,
        timestamp: e.timestamp
    });
});

prismaClient.$on('info', (e) => {
    logger.info({
        type: 'Prisma Info',
        message: e.message,
        timestamp: e.timestamp
    });
});

prismaClient.$on('query', (e) => {
    // Gunakan debug untuk query (bisa diaktifkan/nonaktifkan via env)
    if (process.env.LOG_QUERY === 'true') {
        logger.debug({
            type: 'Prisma Query',
            query: e.query,
            params: e.params,
            duration: `${e.duration}ms`,
            timestamp: e.timestamp
        });
    }
});

// Optional: Graceful shutdown
process.on('beforeExit', async () => {
    await prismaClient.$disconnect();
});