-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "hasCourtOrder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasDiabetes" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasHypertension" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isBedridden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPregnant" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSuspected" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'guest';
