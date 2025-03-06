"use client";

import { useMemo } from "react";

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

// 'use client';

// import { useEffect, useMemo, useState } from 'react';

// interface DataType<T = string> {
// id: number;
// data: T;
// }

// export default function useAutoArrayData<T = string>(
// arrayData: T[],
// ): DataType<T>[] {
// const datas = useMemo(
// () => arrayData.map((item, i) => ({ id: i, data: item })),
// [arrayData],
// );

// console.log(datas);
// const [data, setData] = useState<DataType<T>[]>([]);

// useEffect(() => {
// setData(datas);
// }, [datas]);

// return data;
// }
