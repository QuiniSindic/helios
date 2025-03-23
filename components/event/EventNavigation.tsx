import ArrowLeft from '@/icons/ArrowLeft';
import ArrowRight from '@/icons/ArrowRight';
import { Match } from '@/types/la_liga/la_liga.types';
import Link from 'next/link';

interface EventNavigationProps {
  currentSlug: string;
  events: Match[];
}

export default function EventNavigation({
  currentSlug,
  events,
}: EventNavigationProps) {
  const currentIndex = events.findIndex((event) => event.slug === currentSlug);

  const previousEvent =
    currentIndex > 0 ? events[currentIndex - 1] : events[events.length - 1];

  const nextEvent =
    currentIndex < events.length - 1 ? events[currentIndex + 1] : events[0];

  return (
    <div className="flex justify-between mb-4">
      <Link href={`/event/${previousEvent.slug}`}>
        <p className="bg-secondary text-white py-2 px-4 rounded">
          <ArrowLeft />
        </p>
      </Link>
      <Link href={`/event/${nextEvent.slug}`}>
        <p className="bg-secondary text-white py-2 px-4 rounded">
          <ArrowRight />
        </p>
      </Link>
    </div>
  );
}
