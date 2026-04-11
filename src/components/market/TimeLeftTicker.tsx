import { useEffect, useState } from "react";

function formatDuration(ms: number) {
  if (ms <= 0) return "0s";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${sec}s`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

type Props = {
  startUtc: string;
  endUtc: string;
  status: "scheduled" | "live" | "settled";
};

/** Live-updating countdown: scheduled → time until start; live → time until end. */
export function TimeLeftTicker({ startUtc, endUtc, status }: Props) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const start = new Date(startUtc).getTime();
  const end = new Date(endUtc).getTime();
  const now = Date.now();

  if (status === "settled") {
    return <span className="font-mono text-xs text-slate-500">—</span>;
  }

  if (status === "scheduled") {
    const diff = start - now;
    if (diff <= 0) {
      return <span className="font-mono text-xs font-semibold text-amber-700">Imminent</span>;
    }
    return (
      <span className="font-mono text-xs font-semibold tabular-nums text-amber-800">
        {formatDuration(diff)}
        <span className="ml-1 font-sans text-[10px] font-normal text-slate-500">to start</span>
      </span>
    );
  }

  const diff = end - now;
  if (diff <= 0) {
    return <span className="font-mono text-xs font-semibold text-rose-700">Ended</span>;
  }
  return (
    <span className="font-mono text-xs font-bold tabular-nums text-tx-teal">
      {formatDuration(diff)}
    </span>
  );
}
