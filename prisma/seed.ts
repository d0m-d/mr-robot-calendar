import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.event.create({
      data: {
        event:
          "Whiterose's men kill the FBI agents sent for Zhang, as she proclaims there is only Whiterose now.",
        episodeId: 411,
        timeOfDay: "after midnight",
        dayOfWeek: "Friday",
        date: "2015-12-26",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
