import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.event.create({
      data: {
        event:
          "Tyrell calls Irving for help after shooting Elliot. Irving arrives at Confictura Industries and calls a couple of Dark Army approved doctors who surgically remove the bullet from Elliot's stomach.",
        date: "2015-08-08",
        timeOfDay: "day",
        dayOfWeek: "Friday",
        episodeId: 301,
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
