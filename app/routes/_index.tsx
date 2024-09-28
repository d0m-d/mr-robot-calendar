import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { months } from "~/helpers/enums";
import { EpisodeType } from "~/helpers/types";
import { useEffect, useRef, useState } from "react";
import { generateConfetti } from "~/helpers/generateConfetti";
import { findNextEpisodes } from "~/helpers/getNextEpisodes";

export const meta: MetaFunction = () => {
  return [
    { title: "Mr. Robot Episode Calendar" },
    { name: "description", content: "Mr. Robot Episode Calendar" },
  ];
};
export const loader = async () => {
  const data = await db.episode.findMany();
  return data;
};
type LoaderType = Awaited<ReturnType<typeof loader>>;

export default function Index() {
  const data = useLoaderData<LoaderType>();
  const currentDate = new Date();
  const currentMonth = months.find((month) =>
    month.name.includes(currentDate.toString().split(" ")[1])
  );

  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (showConfetti) generateConfetti(containerRef);
  }, []);

  const getEpisodeCountdown = () => {
    let nextEpisodes = findNextEpisodes(data);
    let daysTilNextEpisode;
    const episodeMonth = months.find((month) =>
      nextEpisodes[0].watchDate.includes(month.name)
    );
    const episodeDay = nextEpisodes[0].watchDate.split(" ")[1];
    if (episodeMonth?.number === currentMonth?.number) {
      daysTilNextEpisode = parseInt(episodeDay) - currentDate.getDate();
    } else {
      if (currentMonth && episodeMonth) {
        for (
          let i = currentMonth.number - 1;
          i < episodeMonth.number - 1;
          i++
        ) {
          daysTilNextEpisode =
            parseInt(episodeDay) - currentDate.getDate() + months[i].days;
        }
      }
    }
    if (daysTilNextEpisode && daysTilNextEpisode >= 1) {
      return (
        <div>
          <div className="flex justify-center text-2xl md:text-3xl">
            <span className="font-bold text-red-500 mr-2 border-2 px-2 rounded-md border-red-500">
              {daysTilNextEpisode}
            </span>
            <span>
              day{daysTilNextEpisode && daysTilNextEpisode > 1 && "s"} until
              next episode!
            </span>
          </div>
          <div className="mt-2 hidden lg:flex justify-center text-xl">
            the next episode{nextEpisodes.length > 1 && "s"}{" "}
            {nextEpisodes.length > 1 ? "are" : "is"}
            <span className="font-semibold mx-2">
              {nextEpisodes.map((nextEp, index) => (
                <p className="text-left" key={index}>
                  {nextEp.title}
                </p>
              ))}
            </span>{" "}
            on
            <span className="font-semibold mx-2">
              {nextEpisodes[0].watchDate}
            </span>
          </div>
        </div>
      );
    } else {
      if (!showConfetti) setShowConfetti(true);
      return (
        <div>
          <div className="w-full text-xl text-center lg:text-2xl">
            <p className="w-full font-bold text-red-500">
              EPISODE{nextEpisodes.length > 1 && "S"} TODAY:
            </p>
            <p className="font-semibold w-full">
              {nextEpisodes.map((nextEp, index) => (
                <p className="text-center" key={index}>
                  {nextEp.title}
                </p>
              ))}
            </p>
          </div>
        </div>
      );
    }
  };
  return (
    <div ref={containerRef}>
      <div className="flex justify-center mb-8">
        <div className="font-sans p-4 bg-gray-100/85 border-4 border-red-500 w-11/12 mt-4 lg:w-3/4 lg:mt-16 pb-8 rounded-md">
          <h1 className="text-3xl md:text-5xl font-semibold mb-2 text-center">
            Hello, friend
          </h1>

          <div className="text-center">{getEpisodeCountdown()}</div>
          <div className="flex justify-center my-8">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=800&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showPrint=0&title=Mr%20Robot%20Watch%20Dates&showCalendars=0&src=bXJyb2JvdGNhbGVuZGFyQGdtYWlsLmNvbQ&color=%23D50000"
              scrolling="no"
              className="h-[500px] w-[800px] lg:h-[800px] lg:w-[1200px] rounded-md"
            ></iframe>
          </div>
          <div className="flex justify-between">
            <Link to="/timeline">
              <button className="p-2 border-2 rounded-md border-red-500 text-red-500 text-xl font-medium bg-gradient-to-r from-cyan-100 to-white mx-2">
                full series timeline
              </button>
            </Link>
            <Link to="/drinkingCues">
              <button className="p-2 border-2 rounded-md border-red-500 text-red-500 text-xl font-medium bg-gradient-to-r from-cyan-100 to-white mx-2">
                drinking game cues
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
