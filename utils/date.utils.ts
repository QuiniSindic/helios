import dayjs from 'dayjs';
import 'dayjs/locale/es';

// REMOVE solo se utiliza en quiniela
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

  // formato final -> "Domingo 24 de Agosto a las 17:30h"
  return (
    djs
      .locale('es')
      .format('dddd DD [de] MMMM [a las] HH:mm[h]')
      // capitalizo día y mes
      .replace(/^./, (c) => c.toUpperCase())
      .replace(
        / de ([a-záéíóúñü]+)/,
        (_, m) => ' de ' + m.charAt(0).toUpperCase() + m.slice(1),
      )
  );
}

export const parseKickoff = (kickoff?: string | Date | number): Date | null => {
  if (kickoff === null || kickoff === undefined) return null;

  // checks para parsear guay
  if (kickoff instanceof Date) {
    return isNaN(kickoff.getTime()) ? null : kickoff;
  }
  if (typeof kickoff === 'number') {
    const d = new Date(kickoff);
    return isNaN(d.getTime()) ? null : d;
  }

  const s = String(kickoff).trim();
  if (!s) return null;

  if (s.includes('T')) {
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  }

  // Formato 'HH:mm DD/MM/YYYY'
  const parts = s.split(' ');
  if (parts.length === 2) {
    const [time, date] = parts;
    const [hour, minute] = time.split(':').map(Number);
    const [day, month, year] = date.split('/').map(Number);

    if (
      Number.isFinite(hour) &&
      Number.isFinite(minute) &&
      Number.isFinite(day) &&
      Number.isFinite(month) &&
      Number.isFinite(year)
    ) {
      const d = new Date(year, month - 1, day, hour, minute, 0);
      return isNaN(d.getTime()) ? null : d;
    }
  }

  // por si falla
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
};
