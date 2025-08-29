// EventNavigation.tsx
import ArrowLeft from '@/components/ui/icons/ArrowLeft';
import ArrowRight from '@/components/ui/icons/ArrowRight';
import { MatchData } from '@/types/events/events.types';
import Link from 'next/link';

interface EventNavigationProps {
  currentId: number;
  events: MatchData[];
}

export default function EventNavigation({
  currentId,
  events,
}: EventNavigationProps) {
  if (!events || events.length === 0) return null;

  const currentIndex = events.findIndex((e) => e.id === currentId);
  const previousEvent =
    currentIndex > 0 ? events[currentIndex - 1] : events[events.length - 1];
  const nextEvent =
    currentIndex < events.length - 1 ? events[currentIndex + 1] : events[0];

  return (
    <div className="sticky top-[var(--header-h)] z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-3 sm:mx-4 py-2 flex items-center justify-between">
        <Link href={`/event/${previousEvent.id}`} aria-label="Partido anterior">
          <span className="bg-secondary text-white py-2 px-4 rounded-lg inline-flex items-center">
            <ArrowLeft />
          </span>
        </Link>
        <Link href={`/event/${nextEvent.id}`} aria-label="Siguiente partido">
          <span className="bg-secondary text-white py-2 px-4 rounded-lg inline-flex items-center">
            <ArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}

// OLD
/**
 *  return (
    <div className="flex justify-between mb-4">
      <Link href={`/event/${previousEvent.id}`}>
        <p className="bg-secondary text-white py-2 px-4 rounded-lg">
          <ArrowLeft />
        </p>
      </Link>
      <Link href={`/event/${nextEvent.id}`}>
        <p className="bg-secondary text-white py-2 px-4 rounded-lg">
          <ArrowRight />
        </p>
      </Link>
    </div>
  );
 */
