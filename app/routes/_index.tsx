import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { months } from "~/helpers/enums";
import { EpisodeType } from "~/helpers/types";

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

  const getNextEpisode = () => {
    let nextEpisode: EpisodeType = data[0];
    let daysTilNextEpisode;
    const episodesThisMonth = data.filter((episode) => {
      if (currentMonth && episode.watchDate.includes(currentMonth?.name)) {
        if (parseInt(episode.watchDate.split(" ")[1]) >= currentDate.getDate())
          return episode;
      }
    });
    if (episodesThisMonth.length > 0) {
      nextEpisode = episodesThisMonth[0];
      daysTilNextEpisode =
        parseInt(nextEpisode.watchDate.split(" ")[1]) - currentDate.getDate();
    } else {
      const futureEpisodes = data.filter((episode) => {
        const episodeMonth = months.find((month) =>
          episode.watchDate.includes(month.name)
        );
        if (episodeMonth && currentMonth) {
          if (episodeMonth.number > currentMonth.number) return episode;
        }
      });
      nextEpisode = futureEpisodes[0];
      if (currentMonth) {
        daysTilNextEpisode =
          currentMonth?.days -
          currentDate.getDate() +
          parseInt(nextEpisode.watchDate.split(" ")[1]);
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
            the next episode is{" "}
            <span className="font-semibold mx-2">{nextEpisode.title}</span> on{" "}
            <span className="font-semibold mx-2">{nextEpisode.watchDate}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="mt-2 flex justify-center text-xl">
            Today's episode is
            <span className="font-semibold mx-2">{nextEpisode.title}</span>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <div className="flex lg:hidden justify-end"></div>
      <div className="flex justify-center">
        <div className="font-sans p-4 bg-gray-100/85 border-4 border-red-500 w-11/12 lg:w-3/4 mt-16 pb-8 rounded-md">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4 text-center">
            Hello, friend
          </h1>

          <div className="text-center">{getNextEpisode()}</div>
          <div className="flex justify-center my-8">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=800&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showPrint=0&title=Mr%20Robot%20Watch%20Dates&showCalendars=0&src=bXJyb2JvdGNhbGVuZGFyQGdtYWlsLmNvbQ&color=%23D50000"
              scrolling="no"
              className="h-[500px] w-[800px] lg:h-[800px] lg:w-[1200px]"
            ></iframe>
          </div>
          <div className="flex justify-end">
            <button className="p-2 border-2 rounded-md border-red-500 text-red-500 text-xl font-medium bg-gradient-to-r from-cyan-100 to-white">
              <Link to="/drinkingCues">view drinking game cues</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
