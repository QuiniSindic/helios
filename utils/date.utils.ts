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
