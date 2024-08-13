import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
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
  const seasons = [season1, season2, season3, season4];
  const [selectedEpisode, setSelectedEpisode] = useState<number>(0);
  return (
    <div>
      <Link to="/">
        <button className="m-4 p-2 border-2 rounded-md border-red-500 text-red-500 text-xl font-medium bg-gradient-to-r from-cyan-100 to-white">
          Back to Calendar
        </button>
      </Link>
      <div className="flex justify-center">
        <div className="font-sans p-4 bg-gray-100/85 border-4 border-red-500 w-11/12 lg:w-3/4 mt-4 pb-8 rounded-md">
          <h1 className="text-center text-3xl lg:text-4xl font-semibold mb-4">
            Timeline of Episodes
          </h1>
          {seasons.map((season) => (
            <div>
              <div className="lg:ml-8 mt-4">
                <h2 className="font-medium text-2xl lg:text-3xl">
                  Season {seasons.indexOf(season) + 1}
                </h2>
                <p>
                  {formatDate(season[0].startDate)} -{" "}
                  {formatDate(season[season.length - 1].endDate)}
                </p>
              </div>
              {season.map((episode) => (
                <div
                  onClick={() =>
                    selectedEpisode !== episode.id
                      ? setSelectedEpisode(episode.id)
                      : setSelectedEpisode(0)
                  }
                  key={episode.id}
                >
                  <div className="flex justify-between lg:mx-16 p-2 text-lg">
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
                  {selectedEpisode === episode.id && (
                    <div>
                      <p>DETAILS ABOUT THIS EPISODE BLAH BLAH BLAHBLAH</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
