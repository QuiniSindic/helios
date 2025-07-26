import ArrowLeft from '@/icons/ArrowLeft';
import ArrowRight from '@/icons/ArrowRight';
import { MatchData } from '@/types/custom.types';
import Link from 'next/link';

interface EventNavigationProps {
  currentId: number;
  events: MatchData[];
}

export default function EventNavigation({
  currentId,
  events,
}: EventNavigationProps) {
  const currentIndex = events.findIndex((event) => event.id === currentId);

  const previousEvent =
    currentIndex > 0 ? events[currentIndex - 1] : events[events.length - 1];

  const nextEvent =
    currentIndex < events.length - 1 ? events[currentIndex + 1] : events[0];

  return (
    <div className="flex justify-between mb-4">
      <Link href={`/event/${previousEvent.id}`}>
        <p className="bg-secondary text-white py-2 px-4 rounded">
          <ArrowLeft />
        </p>
      </Link>
      <Link href={`/event/${nextEvent.id}`}>
        <p className="bg-secondary text-white py-2 px-4 rounded">
          <ArrowRight />
        </p>
      </Link>
    </div>
  );
}
