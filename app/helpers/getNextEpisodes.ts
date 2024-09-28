import { months } from "./enums";
import { EpisodeType } from "./types";

export const findNextEpisodes = (data: EpisodeType[]) => {
  const currentDate = new Date();
  const currentMonth = months.find((month) =>
    month.name.includes(currentDate.toString().split(" ")[1])
  );
  const nextEpisodes = [];
  const futureEpisodes = data
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
    .sort((a, b) => a.id - b.id);
  for (let i = 0; i < 6; i++) {
    if (
      futureEpisodes[i].watchDate === futureEpisodes[i + 1].watchDate ||
      futureEpisodes[i].watchDate === futureEpisodes[i - 1].watchDate
    )
      nextEpisodes.push(futureEpisodes[i]);
  }
  return nextEpisodes;
};
