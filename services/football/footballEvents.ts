import { SOFASCORE_URL } from '@/core/config';
import { Events, FootballEvent } from '@/types/sofascoreTypes/event.types';
import { parseFootballEventsByLeague } from '@/utils/sofascore/football.utils';
import axios from 'axios';

export const getTodayFootballEvents = async () => {
  try {
    const todayDate = new Date().toISOString().split('T')[0];

    const response = await axios.get<Events<FootballEvent>>(
      `${SOFASCORE_URL}/sport/football/scheduled-events/${todayDate}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
          cors: 'no-cors',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers':
            'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/json',
        },
      },
    );

    // Extraemos la data de la API correctamente
    const eventsData = response.data;

    // Procesamos los eventos
    const parsedEventsByLeague = parseFootballEventsByLeague(eventsData);
    // const parsedEventsByDate = parseFootballEventsByDate(parsedEventsByLeague);

    // Ordenar por `startTimestamp` antes de devolverlos
    const sortedEvents = parsedEventsByLeague.sort(
      (a, b) => a.startTimestamp - b.startTimestamp,
    );

    // console.log("Eventos de hoy:", sortedEvents);

    return sortedEvents;
  } catch (error) {
    console.error('Error obteniendo los eventos de hoy:', error);
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
