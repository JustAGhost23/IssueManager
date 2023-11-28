import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient({
  log: ["query", "warn", "error"],
});

export { prisma };