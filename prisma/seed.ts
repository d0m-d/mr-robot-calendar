import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.event.update({
      where: {
        id: "01fb665b-c20c-4d0e-9ec3-de37f4b5914d",
      },
      data: {
        notes:
          "Darlene still wearing same outfit as the last episode, so I guess fsociety just stayed up all night at the arcade?",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
