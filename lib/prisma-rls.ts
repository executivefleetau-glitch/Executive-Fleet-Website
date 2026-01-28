import { PrismaClient } from '@prisma/client';

// Create Prisma client with RLS middleware
const prismaClientSingleton = () => {
    const prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

    // Middleware to set session variable for Row-Level Security
    prisma.$use(async (params, next) => {
        // Get current user ID from context (will be set by API routes)
        const userId = (params as any).userId;

        if (userId) {
            // Set PostgreSQL session variable for RLS policies
            await prisma.$executeRawUnsafe(
                `SET LOCAL app.current_user_id = '${userId}';`
            );
        }

        // Continue with the query
        return next(params);
    });

    return prisma;
};

declare global {
    var prismaRLS: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Always cache globally to prevent connection pool exhaustion
const prisma = globalThis.prismaRLS ?? prismaClientSingleton();

if (!globalThis.prismaRLS) {
    globalThis.prismaRLS = prisma;
}

export default prisma;
