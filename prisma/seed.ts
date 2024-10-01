import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.drinkingCue.update({
      where: {
        id: "5b7cc13a-e09d-450b-9a5e-be7da9ab84fd",
      },
      data: {
        cue: "God/Deus",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
