import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.drinkingCue.update({
      where: {
        id: "8937c8fa-ca25-49be-850f-ab138ad4b93d",
      },
      data: {
        cue: "Trump reference",
        notes: null,
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
