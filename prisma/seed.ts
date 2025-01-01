import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.drinkingCue.update({
      where: {
        id: "02756ee6-e02a-422f-aa2a-a3abc7f1d2f7",
      },
      data: {
        cue: "today's date appears on screen or in dialogue",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
