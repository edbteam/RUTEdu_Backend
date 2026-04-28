import { PrismaClient } from "./generated"; 

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in your environment variables.");
}

export const prisma = new PrismaClient();