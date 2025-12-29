import { PrismaClient } from "@/prisma/generated/prisma/client"

export type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">
