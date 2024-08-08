-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "gender" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
