/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

interface ResultsListProps {
  full?: boolean;
}

export default function ResultsList({ full = false }: ResultsListProps) {
  // const { selectedSport, selectedLeague } = useFilterStore();
  // const [results, setResults] = React.useState<any>([]);
  // const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState('');
  // const [message, setMessage] = React.useState('');

  // React.useEffect(() => {
  //   const fetchEvents = async () => {
  //     setLoading(true);
  //     // const response = await fetch('/api/results');
  //   };

  //   fetchEvents();
  // }, [selectedSport, selectedLeague]);

  // const displayedResults = full ? results : results.slice(0, 6);

  return (
    // <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
    //   {loading && !error ? (
    //     <p className="text-center text-gray-500">Cargando eventos...</p>
    //   ) : results.length === 0 && !error ? (
    //     <p className="text-center text-gray-500">{message}</p>
    //   ) : error ? (
    //     <p className="text-center text-gray-500">{error}</p>
    //   ) : (
    //     <>
    //       {displayedResults.map((result) => {
    //         switch (result.status.type) {
    //           case 'notstarted':
    //             return (
    //               <Link href={`/event/${result.id}`} key={result.id}>
    //                 <MatchWidget event={result} />
    //               </Link>
    //             );

    //           case 'inprogress':
    //             return (
    //               <Link href={`/event/${result.id}`} key={result.id}>
    //                 <MatchWidget key={result.id} event={result} isLive />
    //               </Link>
    //             );

    //           case 'finished':
    //             return (
    //               <Link href={`/event/${result.id}`} key={result.id}>
    //                 <MatchWidget key={result.id} event={result} isFinished />
    //               </Link>
    //             );

    //           default:
    //             return (
    //               <Link href={`/event/${result.id}`} key={result.id}>
    //                 <MatchWidget key={result.id} event={result} />
    //               </Link>
    //             );
    //         }
    //       })}
    //       {!full && results.length > 6 && (
    //         <div className="text-center text-gray-500">
    //           <Link href="/results">
    //             <p>Ver todos los resultados</p>
    //           </Link>
    //         </div>
    //       )}
    //     </>
    //   )}
    // </div>
    <div>data</div>
  );
}
