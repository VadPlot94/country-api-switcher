import { useMemo } from 'react';

export default function useQueryParams() {
  const params = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  const getQueryParam = (
    key: string,
    defaultValue: string | number | boolean = null,
  ) => {
    const value = new URLSearchParams(window.location.search).get(key);
    if (value === null) {
      return defaultValue;
    }

    if (typeof defaultValue === 'boolean') {
      return value === 'true';
    }
    if (typeof defaultValue === 'number') {
      return Number(value);
    }

    return value;
  };

  return { params, getQueryParam };
}
