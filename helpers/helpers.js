export function getLocalSunriseSunset(time, timezone) {
  if (!time || !timezone) return;

  const locale = navigator.language;

  const localTS = (time + timezone) * 1000;

  const date = new Date(localTS);

  const localOffset = date.getTimezoneOffset() * 60 * 1000;

  const newTS = localTS + localOffset;

  const newDate = new Date(newTS);

  return Intl.DateTimeFormat(locale, {
    // weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(newDate);
  // return Date.UTC(localTS);
}
