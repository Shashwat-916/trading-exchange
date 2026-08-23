import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:mysecretpassword@localhost:5432/exchange",
});

export const prisma = new PrismaClient({
  adapter,
});