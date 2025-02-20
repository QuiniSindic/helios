import { SOFASCORE_URL } from '@/core/config';
import {
  parseBasketballEventsByDate,
  parsedBasketballEventsByLeague,
} from '@/utils/sofascore/basketball/basketball.utils';
import { BasketballEvent, Events } from '@/utils/sofascore/types/event.types';
import axios from 'axios';

// Define los headers necesarios
const headers = {
  // authority: 'www.api.sofascore.com',
  // accept: '*/*',
  // 'accept-language': 'es-ES,es;q=0.9',
  // "cache-control": "max-age=0",
  // "if-none-match": "W/\"40802ae6fb\"",
  // origin: 'https://www.sofascore.com',
  // referer: 'https://www.sofascore.com',
  // "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
  // "sec-ch-ua-mobile": "?0",
  // "sec-ch-ua-platform": "\"Windows\"",

  // 'user-agent':
  //   'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36',

  accept: '*/*',
  'accept-language': 'es-ES,es;q=0.9',
  baggage:
    'sentry-environment=production,sentry-release=cqsIxcqQoB4OLYQ-ciM8j,sentry-public_key=d693747a6bb242d9bb9cf7069fb57988,sentry-trace_id=ce494bdb4d6eda5ae6efeecb4c9277ce',
  'cache-control': 'max-age=0',
  'if-none-match': '"36c41e8908"',
  priority: 'u=1, i',
  'sec-ch-ua':
    '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'sentry-trace': 'ce494bdb4d6eda5ae6efeecb4c9277ce-ab16b29f6739eb21',
  'x-requested-with': '95bb8f',
  Referer: 'https://www.sofascore.com/es-la/',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
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
