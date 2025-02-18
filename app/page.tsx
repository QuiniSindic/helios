import EventsContainer from '@/components/home/events/EventsContainer';
import ResultsContainer from '@/components/home/results/ResultsContainer';
import SportsList from '@/components/home/SportsList';
import Welcome from '@/components/home/Welcome';

export default function Home() {
  return (
    <div className="mb-4 mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12">
      <Welcome />
      <>
        {/* 
          Contenedor padre con flex en resoluciones grandes:
          flex-col en móvil/tablet, y flex-row en pantallas lg en adelante
        */}
        <div className="flex flex-col lg:flex-row lg:gap-4">
          {/* Columna izquierda */}
          <SportsList />

          {/* Columna derecha que agrupa Events y Results */}
          <div className="flex flex-col lg:flex-row lg:gap-4 flex-1">
            <EventsContainer />
            <ResultsContainer />
          </div>
        </div>
      </>
    </div>
  );
}

/*
<>
  <Welcome />
  <div className="flex flex-col sm:flex-row mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12 mb-4 sm:gap-4 sm:flex-wrap">
    <SportsList />
    <div className="flex flex-col sm:flex-row gap-4 min-w-0">
      <EventsContainer />
      <ResultsContainer />
    </div>
  </div> 
</>
*/
