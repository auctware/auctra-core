import { useEffect, useState } from "react";

type Options = {
  startPrice: number;
  floorPrice: number;
  tickSize: number;
  intervalMs: number;
};

/** Simulates a descending Dutch clock for demo UI. */
export function useDutchTicker({ startPrice, floorPrice, tickSize, intervalMs }: Options) {
  const [price, setPrice] = useState(startPrice);
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    setPrice(startPrice);
    setTicks(0);
  }, [startPrice]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPrice((p) => {
        if (p <= floorPrice) return p;
        const next = Math.max(floorPrice, p - tickSize);
        setTicks((t) => t + 1);
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [floorPrice, tickSize, intervalMs, startPrice]);

  return { price, ticks };
}
