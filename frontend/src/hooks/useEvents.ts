import { useState, useEffect, useCallback } from 'react';
import type { GameEvent } from '@/types';
import { getEvents } from '@/api/events';

export const useEvents = (from: string, to: string) => {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getEvents(from, to);
      setEvents(data);
    } catch (error) {
      console.error('일정 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const refetch = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, isLoading, refetch };
};
