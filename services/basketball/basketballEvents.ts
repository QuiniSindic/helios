import { SOFASCORE_URL } from '@/core/config';
import {
  parseBasketballEventsByDate,
  parsedBasketballEventsByLeague,
} from '@/utils/sofascore/basketball/basketball.utils';
import { BasketballEvent, Events } from '@/utils/sofascore/types/event.types';
import axios from 'axios';

// Define los headers necesarios
const headers = {
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
};

export const getTodayBasketballEvents = async () => {
  try {
    const todayDate = new Date().toISOString().split('T')[0];

    const response = await axios.get<Events<BasketballEvent>>(
      `${SOFASCORE_URL}/sport/basketball/scheduled-events/${todayDate}`,
      {
        headers,
      },
    );

    // Extraemos la data de la API correctamente
    const eventsData = response.data;

    console.log('Eventos basket:', eventsData);

    // Procesamos los eventos
    const parsedEventsByLeague = parsedBasketballEventsByLeague(eventsData);
    const parsedEventsByDate =
      parseBasketballEventsByDate(parsedEventsByLeague);

    // Ordenar por `startTimestamp` antes de devolverlos
    const sortedEvents = parsedEventsByDate.sort(
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
      {
        headers,
      },
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
