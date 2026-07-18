export interface CalendarDay {
  date: Date;
  iso: string;
}

export const toIsoDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const WEEKS_SHOWN = 5;

export const getCalendarDays = (anchorDate: Date): CalendarDay[] => {
  const start = addDays(anchorDate, -anchorDate.getDay());
  return Array.from({ length: WEEKS_SHOWN * 7 }, (_, i) => {
    const date = addDays(start, i);
    return { date, iso: toIsoDate(date) };
  });
};

export const formatRangeLabel = (start: Date, end: Date): string => {
  const startLabel = `${start.getFullYear()}년 ${start.getMonth() + 1}월 ${start.getDate()}일`;
  const endLabel = start.getFullYear() === end.getFullYear()
    ? `${end.getMonth() + 1}월 ${end.getDate()}일`
    : `${end.getFullYear()}년 ${end.getMonth() + 1}월 ${end.getDate()}일`;
  return `${startLabel} - ${endLabel}`;
};
