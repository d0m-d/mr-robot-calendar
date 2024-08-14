import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.drinkingCue.createMany({
      data: [
        {
          cue: "Samar says something crude",
          type: "character",
        },
        {
          cue: "Lloyd says something crude",
          type: "character",
        },
      ],
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
