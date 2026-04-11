export type AuctionMechanism = "english" | "yankee" | "dutch";

/** Full row for market watch — supports hundreds of lots on the floor. */
export type MarketWatchLot = {
  id: string;
  shortTitle: string;
  commodity: string;
  description: string;
  imageUrl: string;
  qty: string;
  basePrice: string;
  bestBid: string | null;
  location: string;
  warehouse: string;
  mechanism: AuctionMechanism;
  status: "scheduled" | "live" | "settled";
  startUtc: string;
  endUtc: string;
  participants: number;
  reserveMet: boolean;
  notionalCr?: number;
  spreadBps?: number;
  gradeNote?: string;
  predictedPrice?: string;
  isRecommended?: boolean;
  volatility?: "low" | "medium" | "high";
};

const IMG = {
  cu: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=140&fit=crop&q=80",
  al: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=140&fit=crop&q=80",
  fe: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=200&h=140&fit=crop&q=80",
  br: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=140&fit=crop&q=80",
  ss: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=200&h=140&fit=crop&q=80",
  ni: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=200&h=140&fit=crop&q=80",
  zn: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&h=140&fit=crop&q=80",
  yard: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=140&fit=crop&q=80",
  agri: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=140&fit=crop&q=80",
} as const;

const templates: Omit<
  MarketWatchLot,
  "id" | "startUtc" | "endUtc" | "participants" | "status"
>[] = [
  {
    shortTitle: "Copper scrap Berry — ex-JNPT",
    commodity: "Copper scrap (Berry)",
    description:
      "Clean copper wire & cable; ISRI Berry/Birch–Cliff; moisture ≤2%; weigh-bridge at gate.",
    imageUrl: IMG.cu,
    qty: "50 MT",
    basePrice: "₹4,60,000 / MT",
    bestBid: "₹4,82,000 / MT",
    location: "Navi Mumbai, MH",
    warehouse: "JNPT Yard B-12",
    mechanism: "english",
    reserveMet: true,
    notionalCr: 24.1,
    spreadBps: 32,
    gradeNote: "Berry · ISO lot",
  },
  {
    shortTitle: "Aluminum Tense / Tabor",
    commodity: "Aluminum scrap (Tense)",
    description: "Mixed automotive & extrusion; Tabor cut; seller provides XRF spot checks.",
    imageUrl: IMG.al,
    qty: "200 MT",
    basePrice: "₹1,78,000 / MT",
    bestBid: "₹1,84,200 / MT",
    location: "Chennai, TN",
    warehouse: "Sriperumbudur WH-4",
    mechanism: "yankee",
    reserveMet: false,
    notionalCr: 3.6,
    spreadBps: 48,
    gradeNote: "Tense/Tabor",
  },
  {
    shortTitle: "HMS 1&2 + shred bundle",
    commodity: "HMS ferrous",
    description: "Heavy melting steel + shred; ex-yard loading; TPI survey on request.",
    imageUrl: IMG.fe,
    qty: "400 MT",
    basePrice: "₹38,000 / MT",
    bestBid: "₹38,200 / MT",
    location: "Mundra, GJ",
    warehouse: "Adani Port Laydown",
    mechanism: "dutch",
    reserveMet: true,
    notionalCr: 8.2,
    spreadBps: 21,
    gradeNote: "HMS 1&2",
  },
  {
    shortTitle: "Brass honey / ebony",
    commodity: "Brass scrap",
    description: "Honey and Ebony grades; free of contamination per sample seal.",
    imageUrl: IMG.br,
    qty: "120 MT",
    basePrice: "₹5,20,000 / MT",
    bestBid: "₹5,42,000 / MT",
    location: "Jaipur, RJ",
    warehouse: "Sitapura Industrial WH-7",
    mechanism: "english",
    reserveMet: true,
    notionalCr: 14.4,
    spreadBps: 18,
    gradeNote: "Honey / Ebony",
  },
  {
    shortTitle: "Stainless 304 turnings",
    commodity: "SS 304 turnings",
    description: "Oil-free turnings; drum packed; mill test certificate available.",
    imageUrl: IMG.ss,
    qty: "85 MT",
    basePrice: "₹1,95,000 / MT",
    bestBid: "₹2,01,500 / MT",
    location: "Pune, MH",
    warehouse: "Chakan STPI Yard",
    mechanism: "english",
    reserveMet: true,
    notionalCr: 5.2,
    spreadBps: 28,
    gradeNote: "304",
  },
  {
    shortTitle: "Nickel cathode offcuts",
    commodity: "Ni scrap",
    description: "Cathode offcuts; vacuum-packed lots; assay at buyer lab.",
    imageUrl: IMG.ni,
    qty: "12 MT",
    basePrice: "₹12,40,000 / MT",
    bestBid: null,
    location: "Visakhapatnam, AP",
    warehouse: "Vizag Port CFS-2",
    mechanism: "english",
    reserveMet: false,
    notionalCr: 3.1,
    spreadBps: 0,
    gradeNote: "Ni >99%",
  },
  {
    shortTitle: "Zinc dross / skimmings",
    commodity: "Zinc dross",
    description: "Galvanizing dross; batch-wise; moisture declaration mandatory.",
    imageUrl: IMG.zn,
    qty: "65 MT",
    basePrice: "₹1,42,000 / MT",
    bestBid: "₹1,38,800 / MT",
    location: "Ghaziabad, UP",
    warehouse: "Sahibabad Yard A",
    mechanism: "dutch",
    reserveMet: true,
    notionalCr: 2.8,
    spreadBps: 35,
    gradeNote: "Dross",
  },
  {
    shortTitle: "Mixed ferrous light scrap",
    commodity: "Light scrap",
    description: "Shredded auto & appliances; density as per yard rules.",
    imageUrl: IMG.yard,
    qty: "600 MT",
    basePrice: "₹31,500 / MT",
    bestBid: null,
    location: "Indore, MP",
    warehouse: "Pithampur LCL Yard",
    mechanism: "yankee",
    reserveMet: false,
    notionalCr: 6.4,
    spreadBps: 41,
    gradeNote: "Shred",
  },
  {
    shortTitle: "Milling Wheat Grade A",
    commodity: "Milling Wheat",
    description: "Premium milling wheat; moisture <12%; protein >11%; direct ship from silo.",
    imageUrl: IMG.agri,
    qty: "500 MT",
    basePrice: "₹24,500 / MT",
    bestBid: "₹24,850 / MT",
    location: "Khandwa, MP",
    warehouse: "Agri Hub Silo 2",
    mechanism: "english",
    reserveMet: true,
    notionalCr: 1.2,
    spreadBps: 15,
    gradeNote: "Grade A",
  },
  {
    shortTitle: "Raw Cotton (Sankar-6)",
    commodity: "Raw Cotton",
    description: "Gujarati Sankar-6 cotton bales; 29mm staple length; machine ginned.",
    imageUrl: IMG.agri,
    qty: "1000 Bales",
    basePrice: "₹58,000 / Candy",
    bestBid: "₹59,200 / Candy",
    location: "Rajkot, GJ",
    warehouse: "Kisan Godown",
    mechanism: "yankee",
    reserveMet: false,
    notionalCr: 2.1,
    spreadBps: 22,
    gradeNote: "Sankar-6",
  },
];

function buildMarketWatchLots(count: number): MarketWatchLot[] {
  const rows: MarketWatchLot[] = [];
  const base = Date.UTC(2026, 3, 9, 6, 0, 0);

  for (let i = 0; i < count; i++) {
    const t = templates[i % templates.length];
    const start = new Date(base + i * 33 * 60_000);
    const end = new Date(start.getTime() + (2 + (i % 4)) * 3600_000 + 15 * 60_000);

    let status: MarketWatchLot["status"] = "live";
    if (i % 7 === 0) status = "scheduled";
    else if (i % 7 === 1) status = "settled";

    const participants = 8 + (i % 35) + (status === "live" ? 10 : 0);

    let bestBid: string | null = t.bestBid;
    if (status === "scheduled") bestBid = null;
    else if (status === "settled") bestBid = t.bestBid ?? t.basePrice;

    // AI Mock Data Generation
    const isRecommended = i % 11 === 3;
    let volatility: "low" | "medium" | "high" = "low";
    if (i % 5 === 0) volatility = "medium";
    if (i % 8 === 0 && status === "live") volatility = "high";

    // Fake a predicted clearing price slightly above or below the base price
    const baseNum = parseInt(t.basePrice.replace(/[^0-9]/g, "")) || 0;
    const predictedNum = baseNum > 0 ? baseNum + (i % 15 - 5) * (baseNum * 0.005) : 0;
    const predictedPrice = predictedNum > 0 
      ? `₹${Math.floor(predictedNum).toLocaleString()} / ${t.basePrice.split("/")[1]?.trim() ?? "MT"}` 
      : undefined;

    rows.push({
      ...t,
      id: `AUC-${String(24000 + i)}`,
      shortTitle: `${t.shortTitle} · #${i + 1}`,
      participants,
      status,
      startUtc: start.toISOString(),
      endUtc: end.toISOString(),
      bestBid,
      isRecommended,
      volatility,
      predictedPrice,
    });
  }

  return rows;
}

/** Demo: 120 rows; swap to API pagination / virtual list for production. */
export const marketWatchLots: MarketWatchLot[] = buildMarketWatchLots(120);
