import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const website = await prisma.website.create({
    data: {
      url: "https://www.google.com",
      userId    : "1",
    },
  });

  await prisma.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "GOOD",
      createdAt: new Date(),
      latency: 100,
    },
  });

  await prisma.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "GOOD",
      //date a day before
      createdAt:   new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
      latency: 312,
    },
  });


  await prisma.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "BAD",
      //date two days before
      createdAt:   new Date(new Date().getTime() - 1000 * 60 * 60 * 48),
      latency: 312,
    },
  });

  
}

await main()