import EventsList from '@/components/home/events/EventsList';
import FilterBar from '@/components/results/FilterBar';
import { Match } from '@/types/la_liga/la_liga.types';

interface EventsPageProps {
  full?: boolean;
  events: Match[];
  loading: boolean;
  error: Error | null;
}

export default function EventsPage({
  events,
  loading,
  error,
}: EventsPageProps) {
  return (
    <div className="mb-4 mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12">
      <div className="container sm:max-w-none sm:p-0 sm:flex sm:gap-4 sm:w-full">
        <main className="mt-2 sm:mt-0 sm:flex-auto">
          <h1 className="text-2xl font-bold text-center bg-secondary text-white rounded-lg p-2 mb-4">
            Eventos
          </h1>
          <FilterBar />
          <EventsList full events={events} isLoading={loading} error={error} />
        </main>
      </div>
    </div>
  );
}
