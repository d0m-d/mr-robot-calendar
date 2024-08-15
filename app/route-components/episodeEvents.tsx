import { useState } from "react";
import { formatDate } from "~/helpers/formatDate";
import { parseDate } from "~/helpers/parseDate";
import { EventType } from "~/helpers/types";

type EventsPropsType = {
  events: EventType[];
};
type timesOfDay = {
  [key: string]: number;
};
export const EpisodeEvents = ({ events }: EventsPropsType) => {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const orderOfEvents: timesOfDay = {
    "after midnight": 1,
    "early morning": 2,
    morning: 3,
    day: 4,
    afternoon: 5,
    evening: 6,
    night: 7,
  };

  const chronologicalEvents = events.sort(
    (a, b) => parseDate(a.date) - parseDate(b.date)
  );

  const episodeEventDates = new Set(
    chronologicalEvents.map((event) => event.date)
  );

  const episodeEventsByDate = [...episodeEventDates].map((date) => {
    const dateEvents = chronologicalEvents
      .filter((event) => event.date === date)
      .sort((a, b) => {
        return orderOfEvents[a.timeOfDay] - orderOfEvents[b.timeOfDay];
      });

    return {
      date,
      events: dateEvents,
    };
  });
  return (
    <div className="flex justify-center">
      <div className="bg-slate-100/90 rounded-md w-11/12 px-4">
        {episodeEventsByDate.map((eventDate) => {
          return (
            <div
              key={eventDate.date}
              className="border-b-2 border-slate-300 last:border-0 py-2"
            >
              <div>
                <p>{eventDate.events[0].dayOfWeek}</p>

                <p className="font-semibold text-lg">
                  {formatDate(eventDate.date)}
                </p>
              </div>

              {eventDate.events.map((event) => {
                const eventSelected = selectedNotes.find(
                  (note) => note === event.id
                );
                return (
                  <div className="first:mt-0 mt-2 last:mb-2" key={event.id}>
                    {event.flashback && (
                      <p className="text-red-500 font-medium">FLASHBACK</p>
                    )}

                    {event.future && (
                      <p className="text-red-500 font-medium">FUTURE</p>
                    )}
                    <div className="lg:flex justify-center">
                      <span className="mr-2 uppercase w-1/12 font-medium">
                        {event.timeOfDay}
                        {event.timeOfDay !== "" && ":"}
                      </span>
                      <span className="w-4/5">
                        {event.event}
                        {event.notes && (
                          <button
                            className="text-sm ml-4 text-cyan-800"
                            onClick={() => {
                              if (!eventSelected) {
                                setSelectedNotes([...selectedNotes, event.id]);
                              } else {
                                const index = selectedNotes.indexOf(event.id);
                                selectedNotes.splice(index, 1);
                                setSelectedNotes([...selectedNotes]);
                              }
                            }}
                          >
                            {!eventSelected ? "view" : "hide"} notes
                          </button>
                        )}
                      </span>
                    </div>

                    {eventSelected && event.notes && (
                      <div className="m-2 border-2 rounded-md border-cyan-200 p-2 w-11/12 lg:w-1/2 mx-auto">
                        <p className="lg:text-center">{event.notes}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
