import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

// Always cache in globalThis to prevent connection pool exhaustion
// This is critical for serverless environments and Supabase connection pooling
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma
}

export default prisma
