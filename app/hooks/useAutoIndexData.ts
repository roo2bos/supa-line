'use client';

import { useMemo } from 'react';

interface DataType<T = string> {
  id: number;
  data: T;
}

export default function useAutoIndexData<T = string>(
  arrayData: T[],
): DataType<T>[] {
  return useMemo(
    () => arrayData.map((item, i) => ({ id: i, data: item })),
    [arrayData],
  );
}
