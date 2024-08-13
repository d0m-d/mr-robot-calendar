import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();

  try {
    await prisma.event.createMany({
      data: [
        {
          event:
            "Michael begs Krista for help catching Elliot before catching wind of Estonian unrest as a result of the hack.",
          date: "2015-05-09",
          timeOfDay: "night",
          dayOfWeek: "Friday",
          episodeId: 110,
          notes:
            "Michael notes that the NYPD cybercrime division has been on Elliot for hacking Michael for 6 weeks.",
        },
        {
          event:
            "Mr. Robot parks Tyrell's SUV in Karim's lot and pays up front for 2 days.",
          date: "2015-05-10",
          timeOfDay: "",
          dayOfWeek: "Saturday",
          episodeId: 110,
        },
        {
          event:
            "Elliot regains control in Tyrell's SUV with the USB glasses hidden in the sunroof. Angela begins work. Elliot returns to fsociety and learns that while he went against their plans for executing the hack, the Dark Army upheld their end of the bargain. Joanna grills Elliot outside her home. James Plouffe commits suicide on-air. Price attempts to reach out to Angela.",
          date: "2015-05-12",
          timeOfDay: "morning",
          dayOfWeek: "Monday",
          episodeId: 110,
        },
        {
          event:
            "Elliot calls 911 to lure Mr. Robot out. Angela doesn't take shit from the judgey salesman, and meets Price at the shareholders' meeting.",
          date: "2015-05-12",
          timeOfDay: "day",
          dayOfWeek: "Monday",
          episodeId: 110,
        },
        {
          event:
            "fsociety hosts the End of the World party at the arcade to cover their fingerprints. Mr. Robot asserts himself in Times Square, invoking hallucinations of Elliot's mother and young self. Price and Whiterose meet at a private club and discuss Whiterose's Washington Township project.",
          date: "2015-05-12",
          timeOfDay: "night",
          dayOfWeek: "Monday",
          episodeId: 110,
          notes:
            "fsociety wipes down. Boardwalk Fail was uploaded to Vimeo 1 month ago. Mr. Robot claims Tyrell and he made 'a deal that would help them both'",
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
