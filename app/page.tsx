/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import EventsContainer from '@/components/home/events/EventsContainer';
import ResultsContainer from '@/components/home/results/ResultsContainer';
import SportsList from '@/components/home/SportsList';
import Welcome from '@/components/home/Welcome';
import { useFilterStore } from '@/store/filterStore';
import React from 'react';

export default function Home() {
  const { setSelectedLeague, setSelectedSport } = useFilterStore();
  const [sportsDefaultURL, setSportsDefaultURL] = React.useState(null);
  const [sportsNewURL, setSportsNewURL] = React.useState(null);
  React.useEffect(() => {
    console.log('Home');
    setSelectedLeague(null);
    setSelectedSport(null);
  }, [setSelectedLeague, setSelectedSport]);

  React.useEffect(() => {
    const fetchSportsDefaultURL = async () => {
      const response = await fetch(
        'https://www.sofascore.com/api/v1/sport/football/scheduled-events/2025-02-20',
      );
      const data = await response.json();
      console.log('fetchSportsDefaultURL', data);
      setSportsDefaultURL(data);
    };

    const fetchSportsNewURL = async () => {
      const response = await fetch(
        'http://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-02-20',
        {
          headers: {
            accept: '*/*',
            'accept-language': 'es-ES,es;q=0.9',
            'sec-ch-ua':
              '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': '95bb8f',
            Referer: 'https://www.sofascore.com/',
          },
          body: null,
          method: 'GET',
        },
      );
      const data = await response.json();
      console.log('fetchSportsNewURL', data);
      setSportsNewURL(data);
    };

    fetchSportsDefaultURL();
    fetchSportsNewURL();
  }, []);

  return (
    <div className="mb-4 mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12">
      <Welcome />
      <>
        <div className="flex flex-col lg:flex-row lg:gap-4">
          <SportsList />
          <div className="flex flex-col lg:flex-row lg:gap-4 flex-1">
            <EventsContainer />
            <ResultsContainer />
          </div>
        </div>
      </>
    </div>
  );
}
