export const TIME_ZONE = "America/Argentina/Cordoba";

export function calendarDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

export function todayISO(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addDays(iso: string, days: number): string {
  const date = calendarDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function dateParts(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("es-AR", {
    ...options,
    timeZone: "UTC",
  }).formatToParts(calendarDate(iso));
}

function part(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  return parts.find((item) => item.type === type)?.value.replace(".", "") ?? "";
}

export function formatLongDate(iso: string): string {
  const parts = dateParts(iso, { weekday: "long", day: "numeric", month: "short" });
  const weekday = part(parts, "weekday");
  const label = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}`;
  return `${label} ${part(parts, "day")} ${part(parts, "month")}`;
}

export function formatShortDate(iso: string): string {
  const parts = dateParts(iso, { day: "numeric", month: "short" });
  return `${part(parts, "day")} ${part(parts, "month")}`;
}

export function weekKey(iso: string): string {
  const date = calendarDate(iso);
  const mondayOffset = (date.getUTCDay() + 6) % 7;
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - mondayOffset);
  return monday.toISOString().slice(0, 10);
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

export function monthLabel(key: string, withYear = false): string {
  const [year, month] = key.split("-").map(Number);
  const name = new Intl.DateTimeFormat("es-AR", {
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1, 12)));
  const pretty = name.charAt(0).toUpperCase() + name.slice(1);
  return withYear ? `${pretty} ${year}` : pretty;
}

export function yearFromISO(iso: string): string {
  return iso.slice(0, 4);
}
