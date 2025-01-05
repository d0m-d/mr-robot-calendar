import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.drinkingCue.update({
      where: {
        id: "58555b85-5b16-44f8-95b4-ac2549e7e4c2",
      },
      data: {
        notes:
          "any drug/alcohol use that occurs solely in Elliot's head (i.e. in F world or when Mr. Robot drinks) does not count.",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
