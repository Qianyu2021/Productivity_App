/*
  Warnings:

  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Task` table. All the data in the column will be lost.
  - Added the required column `taskContent` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status",
DROP COLUMN "title",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "taskContent" TEXT NOT NULL,
ADD COLUMN     "taskName" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TaskStatus";
