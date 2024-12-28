import { months } from "./enums";
import { EpisodeType } from "./types";

export const findNextEpisodes = (data: EpisodeType[]) => {
  const currentDate = new Date();
  const currentMonth = months.find((month) =>
    month.name.includes(currentDate.toString().split(" ")[1])
  );

  const season4over = currentMonth?.number === 12 && currentDate.getDate() > 27;
  const nextEpisodes = [];
  const futureEpisodes = !season4over
    ? data
        .filter((episode) => {
          const episodeMonth = months.find((month) =>
            episode.watchDate.includes(month.name)
          );
          const episodeDay = episode.watchDate.split(" ")[1];
          if (episodeMonth && currentMonth) {
            if (
              episodeMonth.number === currentMonth.number &&
              parseInt(episodeDay) >= currentDate.getDate()
            ) {
              return episode;
            } else if (episodeMonth.number > currentMonth.number) {
              return episode;
            }
          }
        })
        .sort((a, b) => a.id - b.id)
    : data.sort((a, b) => a.id - b.id);
  nextEpisodes.push(futureEpisodes[0]);
  for (let i = 1; i < futureEpisodes.length; i++) {
    if (futureEpisodes[i].watchDate === nextEpisodes[0].watchDate)
      nextEpisodes.push(futureEpisodes[i]);
  }
  return nextEpisodes;
};
