import ResultsList from "./ResultsList";

export default function ResultsContainer() {
  return (
    <>
      {/* Pantallas grandes (sm en adelante) */}
      <div className="hidden sm:flex gap-4 w-full">
        <main className="flex-auto">
          <h1 className="text-2xl font-bold text-center bg-secondary text-white rounded-lg p-2 mb-4">
            Resultados
          </h1>
          <ResultsList />
        </main>
      </div>

      {/* Pantallas pequeñas */}
      <div className="sm:hidden container">
        <h1 className="text-2xl font-bold text-center mt-2 bg-secondary text-white rounded-lg p-2 mb-4">
          Resultados
        </h1>
        <ResultsList />
      </div>
    </>
  );
}
