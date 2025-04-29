-- CreateTable
CREATE TABLE "resetTokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "tokenExpiry" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "resetTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resetTokens" ADD CONSTRAINT "resetTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
