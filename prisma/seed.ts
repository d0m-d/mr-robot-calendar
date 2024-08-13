import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();

  try {
    await prisma.drinkingCue.update({
      where: {
        id: "938abadf-4b67-4c30-a534-de0749677398",
      },
      data: {
        cue: "camera shot behind/above car",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
