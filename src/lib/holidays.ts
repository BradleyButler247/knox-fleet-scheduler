// US holidays observed by the paint shop. These days are treated as
// non-business days: they are not scheduled onto and are visually labeled
// on the calendar.

export type Holiday = { name: string; short: string };

function nthWeekdayOfMonth(year: number, month: number, weekday: number, n: number) {
  // month: 0-11, weekday: 0=Sun..6=Sat, n: 1..5
  const first = new Date(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (n - 1) * 7);
}

function lastWeekdayOfMonth(year: number, month: number, weekday: number) {
  const last = new Date(year, month + 1, 0);
  const offset = (last.getDay() - weekday + 7) % 7;
  return new Date(year, month, last.getDate() - offset);
}

function keyOf(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const cache = new Map<number, Map<string, Holiday>>();

function buildYear(year: number): Map<string, Holiday> {
  const map = new Map<string, Holiday>();
  const add = (d: Date, name: string, short: string) =>
    map.set(keyOf(d), { name, short });

  add(new Date(year, 0, 1), "New Year's Day", "New Year's");
  add(nthWeekdayOfMonth(year, 0, 1, 3), "Martin Luther King, Jr. Birthday", "MLK Day");
  add(nthWeekdayOfMonth(year, 1, 1, 3), "President's Day", "President's Day");
  add(lastWeekdayOfMonth(year, 4, 1), "Memorial Day", "Memorial Day");
  add(new Date(year, 5, 19), "Juneteenth National Independence Day", "Juneteenth");
  const july4 = new Date(year, 6, 4);
  add(july4, "Independence Day", "July 4th");
  // If July 4 falls on a Saturday, the Friday prior is observed as a
  // non-business day (federal observance).
  if (july4.getDay() === 6) {
    add(new Date(year, 6, 3), "Independence Day (Observed)", "July 4th (Obs)");
  }

  add(nthWeekdayOfMonth(year, 8, 1, 1), "Labor Day", "Labor Day");
  add(nthWeekdayOfMonth(year, 9, 1, 2), "Columbus Day", "Columbus Day");
  add(new Date(year, 10, 11), "Veterans Day", "Veterans Day");
  add(nthWeekdayOfMonth(year, 10, 4, 4), "Thanksgiving Day", "Thanksgiving");
  add(new Date(year, 11, 24), "Christmas Eve", "Christmas Eve");
  add(new Date(year, 11, 25), "Christmas Day", "Christmas");
  return map;
}

function yearMap(year: number) {
  let m = cache.get(year);
  if (!m) {
    m = buildYear(year);
    cache.set(year, m);
  }
  return m;
}

export function getHoliday(d: Date): Holiday | undefined {
  return yearMap(d.getFullYear()).get(keyOf(d));
}

export function isHoliday(d: Date): boolean {
  return yearMap(d.getFullYear()).has(keyOf(d));
}

export function isNonBusinessDay(d: Date): boolean {
  const wd = d.getDay();
  if (wd === 0 || wd === 6) return true;
  return isHoliday(d);
}
