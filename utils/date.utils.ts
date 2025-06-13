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

export function formatWithDayjs(dateStr: string): string {
  // regex HH:mm DD/MM/YYYY
  const m = dateStr.match(/^(\d{2}):(\d{2}) (\d{2})\/(\d{2})\/(\d{4})$/);
  let djs;
  if (m) {
    const [, hh, mm, dd, MM, yyyy] = m.map(Number);
    // date obj
    const dateObj = new Date(yyyy, MM - 1, dd, hh, mm);
    // conversion
    djs = dayjs(dateObj);
  } else {
    // fallback si no cuadra el formato
    djs = dayjs(dateStr);
  }

  // formato
  return djs
    .locale('es')
    .format("dddd DD [de] MMMM [a las] HH:mm[h]")
    // capitalizo día y mes
    .replace(/^./, c => c.toUpperCase())
    .replace(/ de ([a-záéíóúñü]+)/, (_, m) =>
      " de " + m.charAt(0).toUpperCase() + m.slice(1)
    );
}


export const parseKickoff = (kickoff: string) => {
  // ej format: '19:00 15/06/2025'
  const [time, date] = kickoff.split(' ');
  const [hour, minute] = time.split(':');
  const [day, month, year] = date.split('/');
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
};
