import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();
  try {
    await prisma.screeningQuestions.createMany({
      data: [
        {
          question: "What is the title of Irving's book?",
          answer: "Beach Towel",
        },
        {
          question: "At what venue does the Deus Group meeting take place?",
          answer: "Cipriani",
        },
        {
          question: "What is the last line of the entire show?",
          answer: "Hello Elliot",
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
