import { PrismaClient } from "@/prisma/generated/prisma"

export type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">
