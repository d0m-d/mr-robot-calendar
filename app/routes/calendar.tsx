import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { months } from "~/helpers/enums";
import { generateConfetti } from "~/helpers/generateConfetti";
import { findNextEpisodes } from "~/helpers/getNextEpisodes";
import { db } from "~/utils/db.server";

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

export default function Calendar() {
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
        if (currentMonth.number === 12 && episodeMonth.number === 2) {
          daysTilNextEpisode = -1;
        } else {
          let monthDays = 0;
          for (
            let i = currentMonth.number - 1;
            i < episodeMonth.number - 1;
            i++
          ) {
            monthDays = monthDays + months[i].days;
          }
          daysTilNextEpisode =
            parseInt(episodeDay) - currentDate.getDate() + monthDays;
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
    } else if (daysTilNextEpisode === 0) {
      if (!showConfetti) setShowConfetti(true);
      return (
        <div>
          <div className="w-full text-xl text-center lg:text-2xl text-white">
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
    } else {
      return <div>come back next year</div>;
    }
  };
  return (
    <div ref={containerRef}>
      <div className="flex justify-center mb-8">
        <div className="text-white font-sans p-4 bg-black/90 border-2 border-red-500 w-11/12 lg:w-3/4 lg:mt-16 pb-8 rounded-md">
          <h1 className="text-3xl md:text-5xl font-semibold mb-2 text-center">
            Hello, friend
          </h1>

          <div className="text-center">{getEpisodeCountdown()}</div>
          <div className="flex justify-center my-4 lg:my-8">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=800&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showPrint=0&title=Mr%20Robot%20Watch%20Dates&showCalendars=0&src=bXJyb2JvdGNhbGVuZGFyQGdtYWlsLmNvbQ&color=%23D50000"
              scrolling="no"
              className="h-[500px] w-[800px] lg:h-[800px] lg:w-[1200px] rounded-md"
            ></iframe>
          </div>
          <div className="flex justify-center">
            <a
              href="mrrobotcalendar@gmail.com.ical.zip"
              download="mrrobotcalendar@gmail.com.ical.zip"
              className="font-semibold border-2 p-2 rounded-md lg:w-1/6 text-center text-sky-300 border-sky-300"
            >
              Export Calendar
            </a>
          </div>
          <div className="flex justify-center mr-4 mt-4">
            join the group rewatch
            <Link
              to="https://discord.gg/zAgcszeC"
              className="font-medium text-sky-300 ml-2"
            >
              discord server
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
