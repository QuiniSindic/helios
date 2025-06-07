import dayjs from "dayjs";
import 'dayjs/locale/es';

export function formattedDate(eventDate: Date): string {
  return eventDate
    .toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
    })
    .replace(',', '')
    .replace(' de', '/')
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function formattedTime(eventDate: Date): string {
  return eventDate
    .toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/^(\d):/, '0$1:');
}

export function formatWithDayjs(date: string): string {
  const formatted = dayjs(date).locale('es').format("dddd DD [de] MMMM [a las] HH:mm[h]");

  //capitaliza dia y mes
  return formatted
    .replace(/^./, (c) => c.toUpperCase())
    
    .replace(/ de ([a-záéíóúñü]+)/, (_match, m) =>
      " de " + m.charAt(0).toUpperCase() + m.slice(1)
    );
}