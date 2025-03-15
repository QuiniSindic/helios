import { Match } from '@/types/la_liga/la_liga.types';
import EventsList from './EventsList';

interface EventsContainerProps {
  full?: boolean;
  events: Match[];
  loading: boolean;
  error: Error | null;
}

export default function EventsContainer({
  events,
  loading,
  error,
}: EventsContainerProps) {
  return (
    <div className="container sm:max-w-none sm:p-0 sm:flex sm:gap-4 sm:w-full">
      <main className="mt-2 sm:mt-2 lg:mt-0 sm:flex-auto">
        <h1 className="text-2xl font-bold text-center bg-secondary text-white rounded-lg p-2 mb-4">
          Eventos
        </h1>
        <EventsList events={events} isLoading={loading} error={error} />
      </main>
    </div>
  );
}
