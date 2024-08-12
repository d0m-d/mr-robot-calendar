import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();

  try {
    await prisma.drinkingCue.createMany({
      data: [
        {
          cue: "anyone puts on an fsociety mask",
          type: "action",
        },
        {
          cue: "a character dies",
          type: "action",
          notes: "extras don't count. Finish drink?",
        },
        {
          cue: "you've been to the physical location of the current scene",
          type: "action",
          notes:
            "Boston Logan airport is the exception to this because they didn't actually film there",
        },
        {
          cue: "the clock shows 11:16",
          type: "action",
        },
        {
          cue: "qwerty is shown",
          type: "action",
        },
        {
          cue: "the men in black following Elliot appear",
          type: "action",
        },
        {
          cue: "a white dark army van appears",
          type: "action",
        },
        {
          cue: "Arizona reference",
          type: "action",
        },
        {
          cue: "Josh Groban reference",
          type: "action",
        },
        {
          cue: "any character consumes drugs or alcohol (willingly or not)",
          type: "action",
          notes: "extras don't count. 1 drink per sip/bump/hit taken.",
        },
        {
          cue: "any meme frame",
          type: "action",
          notes:
            "e.g. Elliot waking up excited, Tyrell smiling over Elliot's shoulder at computer screen, etc",
        },
        {
          cue: "an actor who has since passed away enters the scene",
          type: "action",
          notes: "extras don't count",
        },
        {
          cue: "ominous knock on the door",
          type: "action",
        },
        {
          cue: "the 'roar of death'",
          type: "action",
        },
        {
          cue: "Back to the Future reference",
          type: "action",
        },
        {
          cue: "pictures with faces scribbled over",
          type: "action",
        },
        {
          cue: "shot behind car",
          type: "action",
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
