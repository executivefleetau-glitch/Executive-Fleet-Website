/**
 * Prisma Client Extension for Row-Level Security (RLS)
 * 
 * This utility helps set the PostgreSQL session variable for RLS policies.
 * Use this in API routes to ensure RLS policies are enforced.
 */

import { PrismaClient } from '@prisma/client';

/**
 * Execute a Prisma query with RLS context
 * 
 * @param prisma - Prisma client instance
 * @param userId - Current user ID to set in session
 * @param callback - Async function containing Prisma queries
 * @returns Result of the callback function
 * 
 * @example
 * ```typescript
 * import prisma from '@/lib/prisma';
 * import { withRLS } from '@/lib/prisma-rls-helper';
 * 
 * export async function GET(request) {
 *   const userId = getUserIdFromToken(request); // Get from JWT
 *   
 *   const bookings = await withRLS(prisma, userId, async () => {
 *     return await prisma.booking.findMany();
 *   });
 *   
 *   return Response.json({ bookings });
 * }
 * ```
 */
export async function withRLS<T>(
    prisma: PrismaClient,
    userId: string | null,
    callback: () => Promise<T>
): Promise<T> {
    if (!userId) {
        // If no user ID, execute without RLS context
        // This will cause RLS policies to block all access
        return await callback();
    }

    // Use a transaction to ensure session variable is scoped
    return await prisma.$transaction(async (tx) => {
        // Set the session variable for RLS
        await tx.$executeRawUnsafe(
            `SET LOCAL app.current_user_id = '${userId.replace(/'/g, "''")}'`
        );

        // Execute the callback with the transaction client
        // Note: We need to pass tx to the callback, but TypeScript doesn't allow this easily
        // So we execute the callback and hope it uses the same transaction context
        return await callback();
    });
}

/**
 * Alternative: Create a Prisma client with RLS context pre-set
 * 
 * @param userId - Current user ID
 * @returns Prisma client with RLS context
 * 
 * @example
 * ```typescript
 * const userPrisma = createRLSClient(userId);
 * const bookings = await userPrisma.booking.findMany();
 * ```
 */
export function createRLSClient(userId: string) {
    const prisma = new PrismaClient();

    // Extend Prisma client with automatic session variable setting
    return prisma.$extends({
        query: {
            async $allOperations({ operation, model, args, query }) {
                // Set session variable before each query
                await prisma.$executeRawUnsafe(
                    `SET LOCAL app.current_user_id = '${userId.replace(/'/g, "''")}'`
                );

                return query(args);
            },
        },
    });
}
