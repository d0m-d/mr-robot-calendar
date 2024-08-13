export type EpisodeType = {
  title: string;
  id: number;
  watchDate: string;
  startDate: string;
  endDate: string;
  events?: EventType[];
};

export type EventType = {
  id: string;
  event: string;
  date: string;
  dayOfWeek: string;
  timeOfDay: string;
  notes?: string | undefined | null;
  episodeId: number;
};
