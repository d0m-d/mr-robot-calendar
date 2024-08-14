import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();

  try {
    await prisma.event.createMany({
      data: [
        {
          event:
            "Darlene and Trenton go over the difficulty of training Angela. Mr. Robot places Elliot in his 90s dream, awakening in the afternoon. Cisco receives the modded femtocell from Zhou, and gets a needle buried in his nailbed for talking back.",
          date: "2015-07-02",
          timeOfDay: "day",
          dayOfWeek: "Wednesday",
          episodeId: 206,
          notes:
            "Not clear when he enters the state, but I assume it's the next day as the episode's part of Word Up! Wednesdays. We see Coney Island (where the Alderson family photo was taken) and the Washington Township plant. Alf! is here. Angela has 24 hours to learn the hack. Cisco is aware of (Tyrell? Irving?) involvement in modifying the femtocell.",
        },
        {
          event:
            "Price harangues John Boehner. 8:40 AM Angela meets Cisco while getting the femtocell. Dom visits Ahmed again. 10:40 Darlene breaks into a hotel to assist Angela with the femtocell hack. 11:29 Angela executes the hack. Elliot is dragged from the infirmary to a private room, and speaks with Mr. Robot about Tyrell and the night of the hack.",
          date: "2015-07-03",
          timeOfDay: "morning",
          dayOfWeek: "Thursday",
          episodeId: 206,
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
