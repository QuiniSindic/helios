"use client";

import React from "react";
import { MatchSchedule } from "../MatchSchedule";
import MatchWidget from "../MatchWidget";

export default function ResultsList() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const response = await fetch("/api/results");

      if (!response.ok) {
        setLoading(false);
        const { error } = await response.json();
        // console.error("Error obteniendo los eventos de hoy:", response);
        setError(error);
      }
      const { sortedEvents } = await response.json();
      //   console.log("sortedEvents", sortedEvents);
      setEvents(sortedEvents);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
      {loading && !error ? (
        <p className="text-center text-gray-500">Cargando eventos...</p>
      ) : events.length === 0 && !error ? (
        <p className="text-center text-gray-500">No hay eventos para hoy.</p>
      ) : error ? (
        <p className="text-center text-gray-500">{error}</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-[#272727] mb-4 p-3 md:p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 sm:hover:shadow-lg sm:hover:scale-[1.02] active:scale-[0.98] sm:active:scale-100 flex flex-row sm:flex-col items-center"
          >
            {/* <ResultWidget event={event} /> */}
            <MatchWidget event={event} showScore />
            <div className="ml-auto sm:ml-0 sm:mt-4">
              <MatchSchedule
                date={new Date(event.startTimestamp * 1000).toISOString()}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
