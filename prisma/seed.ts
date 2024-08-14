import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.event.update({
      where: {
        id: "4f44adb5-ce25-450d-8420-911578931df7",
      },
      data: {
        event:
          "Dom manages to throw Santiago off her long enough to flip Darlene by revealing their Python strategy. 11:16: Angela watches Frank Cody and comes to Tyrell's aid as New York plunges into a full blackout.",
        notes: "First mention of Sentinel on the Python board.",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
