import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.event.update({
      where: {
        id: "913ed05d-87c8-4a5b-aca0-a868220858c1",
      },
      data: {
        date: "2015-07-29",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
