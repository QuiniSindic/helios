import {
  ParsedBasketballEvent,
  ParsedEvent,
  ParsedFootballEvent,
} from "@/utils/sofascore/types/parsedEvents.types";

export const sortEvents = (
  footballEvents: ParsedFootballEvent[],
  basketballEvents: ParsedBasketballEvent[]
): ParsedEvent[] => {
  if (footballEvents.length === 0 && basketballEvents.length === 0) {
    return [];
  }

  const todayEvents = [...footballEvents, ...basketballEvents];

  const sortedEvents = todayEvents.sort(
    (a, b) => a.startTimestamp - b.startTimestamp
  );

  return sortedEvents;
};
