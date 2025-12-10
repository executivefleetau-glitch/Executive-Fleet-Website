import { PrismaClient } from '@prisma/client'

const globalForPrisma = global

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error', 'warn'],
  // Connection pooling configuration for better performance
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
