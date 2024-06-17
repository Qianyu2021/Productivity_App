/*
  Warnings:

  - You are about to drop the column `completed` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskContent` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskName` on the `Task` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'COMPLETED');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "completed",
DROP COLUMN "taskContent",
DROP COLUMN "taskDate",
DROP COLUMN "taskName",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
ADD COLUMN     "title" TEXT NOT NULL;
