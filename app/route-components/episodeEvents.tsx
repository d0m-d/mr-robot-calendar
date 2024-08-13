import { Dispatch, SetStateAction, useState } from "react";
import { formatDate } from "~/helpers/formatDate";
import { EventType } from "~/helpers/types";

type EventsPropsType = {
  events: EventType[];
};

export const EpisodeEvents = ({ events }: EventsPropsType) => {
  const episodeEventDates = new Set(
    events
      .sort((a, b) => parseInt(a.date) - parseInt(b.date))
      .map((event) => event.date)
  );

  const episodeEventsByDate = [...episodeEventDates].map((date) => {
    const dateEvents = events.filter((event) => event.date === date);
    return {
      date,
      events: dateEvents,
    };
  });
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  return (
    <div className="flex justify-center">
      <div className="bg-slate-100/90 rounded-md w-11/12 p-4">
        {episodeEventsByDate.map((eventDate) => {
          return (
            <div
              key={eventDate.date}
              className="border-b-2 border-slate-300 last:border-0 first:pt-0 py-4"
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
                  <div className="mt-2" key={event.id}>
                    <div className="lg:flex justify-center">
                      <span className="mr-2 uppercase w-1/12">
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
                      <div className="m-2 border-2 rounded-md border-cyan-300 p-2 w-11/12 lg:w-1/2 mx-auto">
                        <p className="text-center">{event.notes}</p>
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
