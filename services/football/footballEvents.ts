import { SOFASCORE_URL } from '@/core/config';
import {
  parseFootballEventsByDate,
  parseFootballEventsByLeague,
} from '@/utils/sofascore/football/football.utils';
import { Events, FootballEvent } from '@/utils/sofascore/types/event.types';
import axios from 'axios';

// Define los headers necesarios
const headers = {
  accept: '*/*',
  'accept-language': 'es-ES,es;q=0.9',
  referer: 'https://www.sofascore.com/es-la/',
  origin: 'https://www.sofascore.com',
  'user-agent':
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36',
};

export const getTodayFootballEvents = async () => {
  try {
    const todayDate = new Date().toISOString().split('T')[0];

    const response = await axios.get<Events<FootballEvent>>(
      `${SOFASCORE_URL}/sport/football/scheduled-events/${todayDate}`,
      {
        headers,
      },
    );

    // Extraemos la data de la API correctamente
    const eventsData = response.data;

    // Procesamos los eventos
    const parsedEventsByLeague = parseFootballEventsByLeague(eventsData);
    const parsedEventsByDate = parseFootballEventsByDate(parsedEventsByLeague);

    // Ordenar por `startTimestamp` antes de devolverlos
    const sortedEvents = parsedEventsByDate.sort(
      (a, b) => a.startTimestamp - b.startTimestamp,
    );

    // console.log("Eventos de hoy:", sortedEvents);

    return sortedEvents;
  } catch (error) {
    console.error('Error obteniendo los eventos de hoy:', error);
    console.error({ error });
    return [];
  }
};

export const getYesterdaysFootballEvents = async () => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split('T')[0];

    const response = await axios.get<Events<FootballEvent>>(
      `${SOFASCORE_URL}/sport/football/scheduled-events/${yesterdayDate}`,
    );

    // Extraemos la data de la API correctamente
    const eventsData = response.data;

    // Procesamos los eventos
    const parsedEventsByLeague = parseFootballEventsByLeague(eventsData);

    // Ordenar por `startTimestamp` antes de devolverlos
    const sortedEvents = parsedEventsByLeague.sort(
      (a, b) => a.startTimestamp - b.startTimestamp,
    );

    return sortedEvents;
  } catch (error) {
    console.error('Error obteniendo los eventos de ayer:', error);
    return [];
  }
};
