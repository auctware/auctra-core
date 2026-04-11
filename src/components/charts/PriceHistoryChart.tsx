import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { t: string; mid: number };

type Props = {
  data: Point[];
  height?: number;
};

export function PriceHistoryChart({ data, height = 200 }: Props) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#007a86" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#007a86" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Mid"]}
          />
          <Area
            type="monotone"
            dataKey="mid"
            stroke="#007a86"
            strokeWidth={2}
            fill="url(#fillMid)"
            dot={{ r: 3, fill: "#007a86", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#007a86" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
