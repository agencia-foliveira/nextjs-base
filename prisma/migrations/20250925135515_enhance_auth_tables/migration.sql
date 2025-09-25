/*
  Warnings:

  - The `scopes` column on the `ApiKey` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `successful` to the `LoginActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ApiKey" DROP COLUMN "scopes",
ADD COLUMN     "scopes" TEXT[];

-- AlterTable
ALTER TABLE "public"."AuditLog" ADD COLUMN     "metadata" TEXT,
ADD COLUMN     "payload" JSONB;

-- AlterTable
ALTER TABLE "public"."LoginActivity" ADD COLUMN     "successful" BOOLEAN NOT NULL;

-- CreateIndex
CREATE INDEX "ApiKey_key_userId_createdAt_idx" ON "public"."ApiKey"("key", "userId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_userId_createdAt_idx" ON "public"."AuditLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "DataRegistry_createdAt_idx" ON "public"."DataRegistry"("createdAt");

-- CreateIndex
CREATE INDEX "LoginActivity_userId_createdAt_idx" ON "public"."LoginActivity"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "SecurityIncident_userId_createdAt_idx" ON "public"."SecurityIncident"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "User_email_createdAt_deletedAt_idx" ON "public"."User"("email", "createdAt", "deletedAt");
