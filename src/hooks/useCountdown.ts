import { useEffect, useState } from "react";

/** Counts down from `initialSeconds` every second; stops at 0. */
export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [initialSeconds]);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return { seconds, label: `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}` };
}
