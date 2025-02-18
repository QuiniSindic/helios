import EventsList from './EventsList';

export default function EventsContainer() {
  return (
    <div className="container sm:max-w-none sm:p-0 sm:flex sm:gap-4 sm:w-full">
      <main className="mt-2 sm:mt-2 lg:mt-0 sm:flex-auto">
        <h1 className="text-2xl font-bold text-center bg-secondary text-white rounded-lg p-2 mb-4">
          Eventos
        </h1>
        <EventsList />
      </main>
    </div>
  );
}
