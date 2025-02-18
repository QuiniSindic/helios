import { getTodayBasketballEvents } from "@/services/basketball/basketballEvents";
import { sortEvents } from "@/services/events.service";
import { getTodayFootballEvents } from "@/services/football/footballEvents";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const footballEvents = await getTodayFootballEvents();
    const basketballEvents = await getTodayBasketballEvents();

    const sortedEvents = sortEvents(footballEvents, basketballEvents);

    if (sortedEvents.length === 0) {
      return NextResponse.json({ sortedEvents: [] }, { status: 200 });
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
