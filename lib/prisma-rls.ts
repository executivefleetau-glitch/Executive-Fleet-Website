import { PrismaClient } from '@prisma/client';

// Create Prisma client with RLS middleware
const prismaClientSingleton = () => {
    const prisma = new PrismaClient();

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
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
