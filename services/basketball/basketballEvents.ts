import { SOFASCORE_URL } from '@/core/config';
import { BasketballEvent, Events } from '@/types/sofascoreTypes/event.types';
import { parsedBasketballEventsByLeague } from '@/utils/sofascore/basketball.utils';
import axios from 'axios';

export const getTodayBasketballEvents = async () => {
  try {
    const todayDate = new Date().toISOString().split('T')[0];

    const response = await axios.get<Events<BasketballEvent>>(
      `${SOFASCORE_URL}/sport/basketball/scheduled-events/${todayDate}`,
    );

    // Extraemos la data de la API correctamente
    const eventsData = response.data;

    // Procesamos los eventos
    const parsedEventsByLeague = parsedBasketballEventsByLeague(eventsData);
    // const parsedEventsByDate =
    //   parseBasketballEventsByDate(parsedEventsByLeague);

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

export const getYesterdaysBasketballEvents = async () => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split('T')[0];

    const response = await axios.get<Events<BasketballEvent>>(
      `${SOFASCORE_URL}/sport/basketball/scheduled-events/${yesterdayDate}`,
    );

    // Extraemos la data de la API correctamente
    const eventsData = response.data;

    // Procesamos los eventos
    const parsedEventsByLeague = parsedBasketballEventsByLeague(eventsData);

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
