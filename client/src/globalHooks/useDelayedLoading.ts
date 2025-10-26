import { useState, useEffect, useRef } from "react";

export function useDelayedLoading(loading: boolean, delayMs?: number) {
  const [delayedLoading, setDelayedLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      setDelayedLoading(true);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => {
        setDelayedLoading(false);
      }, delayMs);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [loading, delayMs]);

  return delayedLoading;
}
