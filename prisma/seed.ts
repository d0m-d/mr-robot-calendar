import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.episode.update({
      where: {
        id: 207,
      },
      data: {
        endDate: "2015-07-29",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
