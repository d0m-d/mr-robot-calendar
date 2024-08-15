import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.event.createMany({
      data: [
        {
          event: "",
          date: "",
          timeOfDay: "",
          dayOfWeek: "",
          episodeId: 302,
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
