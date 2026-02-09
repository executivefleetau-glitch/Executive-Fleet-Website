/**
 * Melbourne Timezone Utilities
 * 
 * Centralised helpers for converting between Melbourne local time
 * and UTC for storage / display. All bookings are treated as
 * Melbourne time (Australia/Melbourne).
 */

const TZ = 'Australia/Melbourne';

// ────────────────────────────────────────────────────────────────
// 1.  getMelbourneOffset(date)
//     Returns the Melbourne offset string for a given date,
//     e.g. "+11:00" (AEDT) or "+10:00" (AEST).
// ────────────────────────────────────────────────────────────────
export function getMelbourneOffset(date = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      timeZoneName: 'longOffset',
    }).formatToParts(date);
    const offsetPart = parts.find((p) => p.type === 'timeZoneName');
    if (!offsetPart) return '+10:00';
    let val = offsetPart.value.replace('GMT', '');
    if (val === '') return '+00:00';
    // "+11" → "+11:00"
    if (val.match(/^[+-]\d{1,2}$/)) val += ':00';
    return val;
  } catch {
    return '+10:00';
  }
}

// ────────────────────────────────────────────────────────────────
// 2.  fromMelbourneHHMM(hhmm, dateStr)
//     Convert a Melbourne "HH:MM" + "YYYY-MM-DD" to a JS Date
//     that represents the correct UTC instant.
//     Used when STORING times (POST / PATCH).
// ────────────────────────────────────────────────────────────────
export function fromMelbourneHHMM(hhmm, dateStr) {
  if (!hhmm || !dateStr) return null;
  // Use 02:00 UTC (~noon Melbourne) to determine DST offset for this date.
  // This avoids edge-cases where a no-timezone parse of the local time
  // string (treated as UTC on Vercel) lands on a different DST side than
  // the intended Melbourne local time.  02:00 UTC ≈ 12:00-13:00 AEST/AEDT,
  // safely in the middle of the Melbourne day and far from DST transitions.
  const melbMidday = new Date(`${dateStr}T02:00:00Z`);
  const offset = getMelbourneOffset(melbMidday);
  return new Date(`${dateStr}T${hhmm}:00${offset}`);
}

// ────────────────────────────────────────────────────────────────
// 3.  toMelbourneHHMM(timeValue, dateValue)
//     Convert a stored UTC time (ISO string or Date) back to
//     Melbourne "HH:MM" string (24-hour) for <input type="time">.
//     Combines the date part (for correct DST) with the time part.
// ────────────────────────────────────────────────────────────────
export function toMelbourneHHMM(timeValue, dateValue) {
  if (!timeValue) return '';
  try {
    // Reconstruct a full timestamp so Intl can apply the right DST
    const ts = getReconstructedTimestamp(dateValue, timeValue);
    if (!ts) return '';

    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    // en-GB gives "HH:MM" in 24-hour format
    return formatter.format(ts);
  } catch {
    return '';
  }
}

// ────────────────────────────────────────────────────────────────
// 4.  getReconstructedTimestamp(dateValue, timeValue)
//     Combine a Prisma @db.Date and @db.Time back into a single
//     UTC Date object.  Prisma returns @db.Time as
//     "1970-01-01T[time]Z", so we splice the date and time parts.
// ────────────────────────────────────────────────────────────────
export function getReconstructedTimestamp(dateValue, timeValue) {
  if (!dateValue || !timeValue) return null;
  try {
    const d = new Date(dateValue);
    const t = new Date(timeValue);
    if (isNaN(d.getTime()) || isNaN(t.getTime())) return null;

    const dateStr = d.toISOString().split('T')[0];
    const timeStr = t.toISOString().split('T')[1]; // "HH:mm:ss.sssZ"
    return new Date(`${dateStr}T${timeStr}`);
  } catch {
    return null;
  }
}

// ────────────────────────────────────────────────────────────────
// 5.  getMelbourneDateStr(date?)
//     Return today's (or any date's) YYYY-MM-DD in Melbourne.
// ────────────────────────────────────────────────────────────────
export function getMelbourneDateStr(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const y = parts.find((p) => p.type === 'year').value;
  const m = parts.find((p) => p.type === 'month').value;
  const d = parts.find((p) => p.type === 'day').value;
  return `${y}-${m}-${d}`;
}

// ────────────────────────────────────────────────────────────────
// 6.  getMelbourneHour(timeValue, dateValue)
//     Return the Melbourne hour (0–23) for a stored time.
//     Used for "bookings by time of day" stats.
// ────────────────────────────────────────────────────────────────
export function getMelbourneHour(timeValue, dateValue) {
  const ts = getReconstructedTimestamp(dateValue, timeValue);
  if (!ts) return null;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    hour: 'numeric',
    hour12: false,
  }).formatToParts(ts);
  const hourPart = parts.find((p) => p.type === 'hour');
  if (!hourPart) return null;
  let h = parseInt(hourPart.value, 10);
  if (h === 24) h = 0; // midnight edge-case
  return h;
}

// ────────────────────────────────────────────────────────────────
// 7.  getMelbourneDayBounds(date?)
//     Return { start, end } as UTC Date objects representing
//     00:00:00 and 23:59:59.999 Melbourne time for the given date.
// ────────────────────────────────────────────────────────────────
export function getMelbourneDayBounds(date = new Date()) {
  const dateStr = getMelbourneDateStr(date);
  const offset = getMelbourneOffset(date);
  const start = new Date(`${dateStr}T00:00:00${offset}`);
  const end = new Date(`${dateStr}T23:59:59.999${offset}`);
  return { start, end };
}

// ────────────────────────────────────────────────────────────────
// 8.  formatDateMelbourne(dateValue)
//     Pretty-print a date in Melbourne (e.g. "Monday, 10 Feb 2026").
// ────────────────────────────────────────────────────────────────
export function formatDateMelbourne(dateValue) {
  if (!dateValue) return 'N/A';
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: TZ,
  });
}

// ────────────────────────────────────────────────────────────────
// 9.  formatTimeMelbourne(timeValue, dateValue?)
//     Pretty-print a time in Melbourne AM/PM.
//     If dateValue is provided, reconstructs the full timestamp
//     for accurate DST handling.
// ────────────────────────────────────────────────────────────────
export function formatTimeMelbourne(timeValue, dateValue = null) {
  if (!timeValue) return 'N/A';
  try {
    // Handle simple "HH:MM" strings (from user input)
    if (typeof timeValue === 'string' && timeValue.match(/^\d{1,2}:\d{2}$/)) {
      const [hours, minutes] = timeValue.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    }

    let date;
    if (dateValue) {
      date = getReconstructedTimestamp(dateValue, timeValue);
    }
    if (!date) date = new Date(timeValue);
    if (isNaN(date.getTime())) return 'N/A';

    return new Intl.DateTimeFormat('en-AU', {
      timeZone: TZ,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } catch {
    return 'N/A';
  }
}
