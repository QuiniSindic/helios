import EventsList from "./EventsList";

export default function EventsContainer() {
  return (
    <>
      {/* Pantallas grandes (sm en adelante) */}
      <div className="hidden sm:flex gap-4 w-full">
        <main className="flex-auto sm:mt-2 lg:mt-0">
          <h1 className="text-2xl font-bold text-center bg-secondary text-white rounded-lg p-2 mb-4">
            Eventos
          </h1>
          {/* <Event selectedLeague={selectedLeague} /> */}
          <EventsList />
        </main>
      </div>

      {/* Pantallas pequeñas */}
      <div className="sm:hidden container">
        <h1 className="text-2xl font-bold text-center mt-2 bg-secondary text-white rounded-lg p-2 mb-4">
          Eventos
        </h1>
        {/* <Event selectedLeague={selectedLeague} /> */}
        <EventsList />
      </div>
    </>
  );
}
