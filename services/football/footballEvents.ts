import { SOFASCORE_URL } from '@/core/config';
import { Events, FootballEvent } from '@/types/sofascoreTypes/event.types';
import { parseFootballEventsByLeague } from '@/utils/sofascore/football/football.utils';
import axios from 'axios';

export const getTodayFootballEvents = async () => {
  try {
    const todayDate = new Date().toISOString().split('T')[0];

    const response = await axios.get<Events<FootballEvent>>(
      `${SOFASCORE_URL}/sport/football/scheduled-events/${todayDate}`,
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
