import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.event.update({
      where: {
        id: "80fbe806-8798-4ead-b3d6-c986ebaedbc5",
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
