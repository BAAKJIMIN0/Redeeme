export const formatEventDateTitle = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}년 ${m}월 ${d}일`;
};

export const formatEventTime = (time: string | null): string => {
  if (!time) return '종일';
  return time.slice(0, 5);
};

export const formatEventDateTime = (eventDate: string, eventTime: string | null): string => {
  const [, m, d] = eventDate.split('-').map(Number);
  return `${m}월 ${d}일 ${formatEventTime(eventTime)}`;
};

export const getEventDateTimeMs = (eventDate: string, eventTime: string | null): number => {
  return new Date(`${eventDate}T${eventTime ?? '00:00:00'}`).getTime();
};
