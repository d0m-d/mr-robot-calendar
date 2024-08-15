import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.event.update({
      where: {
        id: "56a83d2a-4c39-492e-9719-ef3a8c87be83",
      },
      data: {
        event:
          "Elliot invites Mr. Robot to come with him, and together they rededicate themselves to taking down the 1% of the 1%. 8:24 PM: Elliot sends the key to the FBI. Vera returns to Elliot, encountering Darlene outside his apartment.",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
