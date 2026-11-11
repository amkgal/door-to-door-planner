/**
 * Shared Time Utility for Singapore Transit (Asia/Singapore, UTC+8)
 * Ensures all clocks in header, departure, bus arrival, and trip finish are unified.
 */

export function formatSingaporeClock(date: Date | string | number = new Date()): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Singapore',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(d);
  } catch (e) {
    // Fallback if Intl timeZone unavailable
    const sgt = new Date(d.getTime() + 8 * 3600000);
    const h = String(sgt.getUTCHours()).padStart(2, '0');
    const m = String(sgt.getUTCMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }
}

export function formatSingaporeFullDate(date: Date | string | number = new Date()): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Singapore',
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(d);
  } catch (e) {
    return d.toISOString();
  }
}
