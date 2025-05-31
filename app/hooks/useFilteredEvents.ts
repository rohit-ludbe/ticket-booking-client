import { useMemo } from "react";

export const useFilteredEvents = (events: any, filter: any) => {
  return useMemo(() => {
    return events.filter((event) => {
      const matchCategories = filter?.categories
        ? filter?.categories == event?.category
        : false;

      const matchSearch = filter?.search
        ? event?.title?.toLowerCase().includes(filter?.search?.toLowerCase())
        : false;

      if (!filter?.categories && !filter?.search) return true;

      return matchCategories || matchSearch;
    });
  }, [events, filter]);
};
