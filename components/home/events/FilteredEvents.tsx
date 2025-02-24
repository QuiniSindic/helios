// 'use client';

// import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
// import { filterEvents } from '@/services/events.service';
// import { useFilterStore } from '@/store/filterStore';
// import { ParsedEvent } from '@/types/sofascoreTypes/parsedEvents.types';
// import Link from 'next/link';
// import React, { useState } from 'react';

// interface FilteredEventsProps {
//   events: ParsedEvent[];
//   full?: boolean;
// }

// export default function FilteredEvents({
//   events,
//   full = false,
// }: FilteredEventsProps) {
//   const { selectedSport, selectedLeague } = useFilterStore();
//   const [filteredEvents, setFilteredEvents] = useState(events);
//   const [message, setMessage] = useState('');

//   React.useEffect(() => {
//     if (events.length === 0) {
//       setMessage('No hay eventos para hoy.');
//     }

//     const eventsToPlay = events.filter(
//       (event) =>
//         event.status.type === 'notstarted' ||
//         event.status.type === 'inprogress',
//     );

//     const filteredEvents = filterEvents(
//       eventsToPlay,
//       selectedLeague,
//       selectedSport,
//     );

//     if (filteredEvents.length === 0) {
//       setMessage(
//         `No hay eventos próximos para ${selectedLeague || 'esta liga'}`,
//       );
//     }

//     setFilteredEvents(filteredEvents);
//   }, [selectedSport, selectedLeague, events]);

//   const displayedEvents = full ? filteredEvents : filteredEvents.slice(0, 6);

//   return (
//     <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
//       {filteredEvents.length === 0 ? (
//         <p className="text-center text-gray-500">
//           {message || 'No hay eventos para hoy.'}
//         </p>
//       ) : (
//         displayedEvents.map((event) => (
//           <Link href={`/event/${event.id}`} key={event.id}>
//             <MatchWidget
//               event={event}
//               isLive={event.status.type === 'inprogress'}
//             />
//           </Link>
//         ))
//       )}
//       {!full && filteredEvents.length > 6 && (
//         <div className="text-center text-gray-500">
//           <Link href="/events">
//             <p>Ver todos los eventos</p>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }
