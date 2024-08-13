import { useLoaderData } from "@remix-run/react";
import { formatDate } from "~/helpers/formatDate";
import { EpisodeType } from "~/helpers/types";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = db.episode.findMany();
  return data;
};
type LoaderType = Awaited<ReturnType<typeof loader>>;

export default function Timeline() {
  const data = useLoaderData<LoaderType>();
  const season1: EpisodeType[] = [];
  const season2: EpisodeType[] = [];
  const season3: EpisodeType[] = [];
  const season4: EpisodeType[] = [];

  data
    .sort((a, b) => a.id - b.id)
    .map((episode) => {
      switch (episode.id.toString().charAt(0)) {
        case "1":
          season1.push(episode);
          break;
        case "2":
          season2.push(episode);
          break;
        case "3":
          season3.push(episode);
          break;
        case "4":
          season4.push(episode);
          break;
      }
    });
  return (
    <div className="flex justify-center">
      <div className="font-sans p-4 bg-gray-100/85 border-4 border-red-500 w-3/4 mt-4 lg:mt-16 pb-8 rounded-md">
        <h1 className="text-center text-3xl lg:text-4xl font-semibold mb-4">
          Timeline of Episodes
        </h1>
        <div className="lg:ml-8">
          <h2 className="font-medium text-2xl lg:text-3xl">Season 1</h2>
          <p>
            {formatDate(season1[0].startDate)} -{" "}
            {formatDate(season1[season1.length - 1].endDate)}
          </p>
        </div>

        {season1.map((episode) => {
          return (
            <div
              className="flex justify-between lg:mx-16 p-2 text-lg"
              key={episode.id}
            >
              <p className="font-semibold">{episode.id}</p>
              <p className="hidden lg:flex">{episode.title}</p>
              <div>
                <span>
                  {formatDate(episode.startDate)}
                  {episode.startDate !== episode.endDate && (
                    <span> - {formatDate(episode.endDate)}</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
        <div className="lg:ml-8">
          <h2 className="font-medium text-2xl lg:text-3xl mt-4">Season 2</h2>
          <p>
            {formatDate(season2[0].startDate)} -{" "}
            {formatDate(season2[season2.length - 1].endDate)}
          </p>
        </div>
        {season2.map((episode) => {
          return (
            <div
              className="flex justify-between lg:mx-16 p-2 text-lg"
              key={episode.id}
            >
              <p className="font-semibold">{episode.id}</p>
              <p className="hidden lg:flex">{episode.title}</p>
              <div>
                <span>
                  {formatDate(episode.startDate)}
                  {episode.startDate !== episode.endDate && (
                    <span> - {formatDate(episode.endDate)}</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
        <div className="lg:ml-8">
          <h2 className="font-medium text-2xl lg:text-3xl mt-4">Season 3</h2>
          <p>
            {formatDate(season3[0].startDate)} -{" "}
            {formatDate(season3[season3.length - 1].endDate)}
          </p>
        </div>
        {season3.map((episode) => {
          return (
            <div
              className="flex justify-between lg:mx-16 p-2 text-lg"
              key={episode.id}
            >
              <p className="font-semibold">{episode.id}</p>
              <p className="hidden lg:flex">{episode.title}</p>
              <div>
                <span>
                  {formatDate(episode.startDate)}
                  {episode.startDate !== episode.endDate && (
                    <span> - {formatDate(episode.endDate)}</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
        <div className="lg:ml-8">
          <h2 className="font-medium text-2xl lg:text-3xl mt-4">Season 4</h2>
          <p>
            {formatDate(season4[0].startDate)} -{" "}
            {formatDate(season4[season4.length - 1].endDate)}
          </p>
        </div>
        {season4.map((episode) => {
          return (
            <div
              className="flex justify-between lg:mx-16 p-2 text-lg"
              key={episode.id}
            >
              <p className="font-semibold">{episode.id}</p>
              <p className="hidden lg:flex">{episode.title}</p>
              <div>
                <span>
                  {formatDate(episode.startDate)}
                  {episode.startDate !== episode.endDate && (
                    <span> - {formatDate(episode.endDate)}</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
