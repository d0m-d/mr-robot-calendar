import { PrismaClient } from "@prisma/client";

async function seed() {
  const prisma = new PrismaClient();

  try {
    await prisma.event.createMany({
      data: [
        {
          event:
            "Elliot begins his routine anew; he meets Leon at 8 AM for breakfast. At 10 he cleans up. At noon he meets Leon for lunch. At 2 PM they attend the baseball court, where he usually encounters Hot Carla.",
          date: "2015-06-09",
          timeOfDay: "day",
          dayOfWeek: "Monday",
          episodeId: 201,
          notes: "Elliot has been in his loop for one month.",
        },
        {
          event:
            "Krista visits Elliot. At 12:40, he returns to his conflict; Mr. Robot cajoling him into action, Elliot demanding Tyrell's location.",
          date: "2015-06-10",
          timeOfDay: "day",
          dayOfWeek: "Tuesday",
          episodeId: 201,
          notes:
            "Elliot states that Darlene occasionally visits him. Elliot alludes to Mr. Robot to Krista (for the first time?) Mr. Robot doesn't admit that he doesn't know where Tyrell is.",
        },
        {
          event:
            "Darlene and the new fsociety recruits castrate the Wall St. bull.",
          date: "2015-06-10",
          timeOfDay: "night",
          dayOfWeek: "Tuesday",
          episodeId: 201,
        },
        {
          event:
            "Susan Jacobs jogs through the swap market, returning at 6:37 PM, before Darlene forces her out of the smart house, occupying it after 9:40 PM.",
          date: "2015-06-11",
          timeOfDay: "evening",
          dayOfWeek: "Wednesday",
          episodeId: 201,
          notes:
            "Is her route the same as Angela's with the thief? Home system confirms Weds. June 11th. Frank Cody makes his first appearance, and alludes to coming blackouts.",
        },
        {
          event: "Gideon visits Elliot in prison, begging him for help.",
          date: "2015-06-12",
          timeOfDay: "day",
          dayOfWeek: "Thursday",
          episodeId: 201,
          notes:
            "Allsafe has been shut down, with all employes furloughed. Mr. Robot tries to lay blame on himself and Elliot (though we know Angela is responsible). Gideon has not realized Elliot is his hacker, and is under FBI investigation. The day Elliot left - that has to be May 7th, when Elliot stole Gideon's token during the smart TV hack?",
        },
        {
          event:
            "Darlene struggles with her new leadership of fsociety while hosting a party at the smart house. She rallies fsociety before speaking with Mobley and giving him the Bank of E ransomware. Mobley returns to work and executes the hack.",
          date: "2015-06-12",
          timeOfDay: "night",
          dayOfWeek: "Thursday",
          episodeId: 201,
          notes:
            "iPad held up at the party is set to 9:05PM. Mobley is wearing the same clothes at the smart house and at Bank of E.",
        },
        {
          event:
            "Price, Knowles, and Jacobs discuss the ransomware. Price insists that if it even be done, it be done properly.",
          date: "2015-06-13",
          timeOfDay: "day",
          dayOfWeek: "Friday",
          episodeId: 201,
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
