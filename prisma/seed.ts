import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.drinkingCue.update({
      where: {
        id: "de5cf3a2-d30d-4cb0-9fad-2041ea42f8c8",
      },
      data: {
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
