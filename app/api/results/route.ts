import { getYesterdaysBasketballEvents } from "@/services/basketball/basketballEvents";
import { sortEvents } from "@/services/events.service";
import { getYesterdaysFootballEvents } from "@/services/football/footballEvents";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const yesterdayFootballEvents = await getYesterdaysFootballEvents();
    const yesterdaysBasketballEvents = await getYesterdaysBasketballEvents();

    const sortedEvents = await sortEvents(
      yesterdayFootballEvents,
      yesterdaysBasketballEvents
    );

    if (
      yesterdayFootballEvents.length === 0 &&
      yesterdaysBasketballEvents.length === 0
    ) {
      return NextResponse.json(
        { error: "No events for yesterday" },
        { status: 404 }
      );
    }

    return NextResponse.json({ sortedEvents }, { status: 200 });
  } catch (error) {
    console.log("error =>", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
