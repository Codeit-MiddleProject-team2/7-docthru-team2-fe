// data 가져오고 어쩌고 하는 게 귀찮아서 만든 훅...

import { useState, useEffect } from "react";

export function useGetData(apiFn, init, deps = []) {
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("dd");
        const result = await apiFn();
        console.log(result);
        if (!cancelled) setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true; // 언마운트 시 setState 방지
    };
  }, deps);

  return { data, isLoading, setData };
}
