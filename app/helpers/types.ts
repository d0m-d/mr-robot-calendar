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
  flashback?: boolean | undefined | null;
  future?: boolean | undefined | null;
};

export type ScreeningQuestionType = {
  id: string;
  question: string;
  answer: string;
};
