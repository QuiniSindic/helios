// EventsContainer.tsx
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';
import EventsList from './EventsList';

interface EventsContainerProps {
  isLoading?: boolean;
}

export default function EventsContainer({ isLoading }: EventsContainerProps) {
  const { selectedLeague } = useSportsFilter();

  return (
    <div
      className={`container sm:max-w-none sm:p-0 sm:flex sm:gap-4 sm:w-full transition-all duration-300 ${
        selectedLeague ? 'lg:w-3/5' : 'lg:w-full'
      }`}
    >
      <main className="mt-2 sm:mt-2 lg:mt-0 sm:flex-auto">
        <h1 className="text-2xl font-bold text-center bg-secondary text-white rounded-lg p-2 mb-4">
          Eventos
        </h1>
        <EventsList isLoading={isLoading} />
      </main>
    </div>
  );
}
