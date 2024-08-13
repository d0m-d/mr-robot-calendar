import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();

  try {
    await prisma.event.update({
      where: {
        id: "551a8c9e-a188-4799-a366-e1f386b82842",
      },
      data: {
        event:
          "Elliot finishes withdrawal and meets Tyrell while executing the Steel Mountain attack. Angela dumps Ollie. Shayla starts work at Wingstravaganza.",
      },
    });
  } catch (e) {
    console.log("Error seeding data:", e);
  } finally {
    await prisma.$disconnect;
  }
}

seed();
