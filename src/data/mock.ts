import { marketWatchLots, type AuctionMechanism } from "./marketWatchLots";

export type { AuctionMechanism } from "./marketWatchLots";

export type AuctionSession = {
  id: string;
  lot: string;
  mechanism: AuctionMechanism;
  status: "scheduled" | "live" | "settled";
  startUtc: string;
  participants: number;
  reserveMet: boolean;
  notionalCr?: number;
  spreadBps?: number;
};

/** Spotlight slice for dashboard / charts — sourced from same pool as market watch. */
export const auctionSessions: AuctionSession[] = marketWatchLots.slice(0, 10).map((a) => ({
  id: a.id,
  lot: a.shortTitle,
  mechanism: a.mechanism,
  status: a.status,
  startUtc: a.startUtc,
  participants: a.participants,
  reserveMet: a.reserveMet,
  notionalCr: a.notionalCr,
  spreadBps: a.spreadBps,
}));

/** Price path — copper scrap ₹/MT (session mid). */
export const priceHistoryEnglish = [
  { t: "14:00", mid: 468000 },
  { t: "14:03", mid: 471200 },
  { t: "14:06", mid: 474800 },
  { t: "14:09", mid: 478200 },
  { t: "14:12", mid: 482000 },
];

export const volumeByMechanism = [
  { name: "English", cleared: 42, scheduled: 8 },
  { name: "Yankee", cleared: 18, scheduled: 5 },
  { name: "Dutch", cleared: 11, scheduled: 3 },
];

export const dashboardKpis = [
  {
    label: "Total Money in Wallet",
    value: "₹2.50 Cr",
    delta: "72% Used",
    trend: "down" as const,
    hint: "₹1.66 Cr Available to Bid",
    higherIsBetter: true,
    aiInsight: "You have ₹1.66 Cr available. This is enough for most auctions today.",
  },
  {
    label: "Wins vs Bids (Last 30 Days)",
    value: "41.5%",
    delta: "+4.2% up",
    trend: "up" as const,
    hint: "Won 18 out of 43 bids",
    higherIsBetter: true,
    aiInsight: "You are winning more auctions lately because you are bidding faster. Keep doing this.",
  },
  {
    label: "How much you stay under market price",
    value: "-2.4%",
    delta: "₹14.2L Saved",
    trend: "down" as const,
    hint: "Cheaper than open market",
    higherIsBetter: true,
    aiInsight: "Great job. You are buying scrap metal for much cheaper than the normal market price.",
  },
  {
    label: "Stock waiting for Delivery",
    value: "1,420 MT",
    delta: "2 Days Delay",
    trend: "up" as const,
    hint: "Waiting at 4 warehouses",
    higherIsBetter: false,
    aiInsight: "Everything is moving well. But avoid Chennai next week as the port will be very busy.",
  },
];
export const activityFeed = [
  { id: 1, time: "14:12:03", text: "Bid ₹4,82,000/MT · Vertex Scrap & Alloys — AUC-24091", type: "bid" as const },
  { id: 2, time: "14:11:58", text: "Anti-collusion scan: no signal · AUC-24091", type: "ai" as const },
  { id: 3, time: "14:11:41", text: "Bid ₹4,78,500/MT · Southwest Ferrous Recyclers", type: "bid" as const },
  { id: 4, time: "14:10:22", text: "Yankee Al scrap demand +6% vs open · AUC-24092", type: "ai" as const },
  { id: 5, time: "14:09:10", text: "Dutch HMS tick −₹500/MT · AUC-24093", type: "sys" as const },
];

export type ActivityItem = (typeof activityFeed)[number];

export type BookRow = { price: number; qty: string; total: string; depth: number };

export const orderBookBids: BookRow[] = [
  { price: 482000, qty: "12 MT", total: "12", depth: 92 },
  { price: 481500, qty: "8 MT", total: "20", depth: 78 },
  { price: 481000, qty: "15 MT", total: "35", depth: 64 },
  { price: 480200, qty: "10 MT", total: "45", depth: 48 },
  { price: 479000, qty: "20 MT", total: "65", depth: 35 },
];

export const orderBookAsks: BookRow[] = [
  { price: 482800, qty: "6 MT", total: "6", depth: 30 },
  { price: 483400, qty: "9 MT", total: "15", depth: 44 },
  { price: 484000, qty: "11 MT", total: "26", depth: 58 },
];

export const yankeeProvisional = [
  { rank: 1, bidder: "Metro Non-Ferrous Recyclers", qty: 55, price: 185200, total: 10186000 },
  { rank: 2, bidder: "Shriram Scrap & Alloys", qty: 48, price: 184800, total: 8870400 },
  { rank: 3, bidder: "Vertex Scrap & Alloys", qty: 40, price: 184200, total: 7368000 },
  { rank: 4, bidder: "Chennai Steel Traders", qty: 35, price: 183900, total: 6436500 },
  { rank: 5, bidder: "Reserve / unsold", qty: 22, price: null as number | null, total: null as number | null },
];

/** Cumulative demand by ₹/MT band — aluminum scrap (Yankee). */
export const yankeeDemandBands = [
  { band: "₹1.86L+", qty: 28 },
  { band: "₹1.84–1.86L", qty: 52 },
  { band: "₹1.82–1.84L", qty: 74 },
  { band: "₹1.80–1.82L", qty: 41 },
  { band: "<₹1.80L", qty: 15 },
];

export const englishBidLadder = [
  { rank: 1, bidder: "Vertex Scrap & Alloys", bid: 482000, time: "14:12:03", you: false },
  { rank: 2, bidder: "Southwest Ferrous Recyclers", bid: 478500, time: "14:11:41", you: true },
  { rank: 3, bidder: "BuildForm Infra", bid: 476200, time: "14:10:55", you: false },
  { rank: 4, bidder: "Globex Logistics LLP", bid: 472000, time: "14:08:12", you: false },
];

export const bidHistory = [
  {
    id: "B-98231",
    auctionId: "AUC-24091",
    bidder: "Vertex Scrap & Alloys",
    amount: "₹4,82,000 / MT",
    time: "2026-04-09T14:12:03Z",
    mechanism: "english" as const,
  },
  {
    id: "B-98232",
    auctionId: "AUC-24091",
    bidder: "Southwest Ferrous Recyclers",
    amount: "₹4,78,500 / MT",
    time: "2026-04-09T14:11:41Z",
    mechanism: "english" as const,
  },
  {
    id: "B-98210",
    auctionId: "AUC-24093",
    bidder: "BuildForm Infra",
    amount: "Accepted @ ₹38,200 / MT",
    time: "2026-04-09T13:52:18Z",
    mechanism: "dutch" as const,
  },
  {
    id: "B-98199",
    auctionId: "AUC-24088",
    bidder: "Jaipur Brass House",
    amount: "₹5,42,000 / MT",
    time: "2026-04-08T11:22:00Z",
    mechanism: "english" as const,
  },
];

export const tradeSummary = [
  {
    id: "TR-4401",
    lot: "Copper scrap (Berry) — 50 MT",
    mechanism: "English",
    clearing: "₹4,85,000 / MT",
    counterparty: "Vertex Scrap & Alloys",
    settlement: "T+2",
  },
  {
    id: "TR-4398",
    lot: "Aluminum scrap (Tense) — 200 MT",
    mechanism: "Yankee (multi-unit)",
    clearing: "Volume-weighted",
    counterparty: "3 winning bidders",
    settlement: "T+3",
  },
  {
    id: "TR-4392",
    lot: "HMS 1&2 — 400 MT",
    mechanism: "Dutch",
    clearing: "₹38,050 / MT",
    counterparty: "BuildForm Infra",
    settlement: "T+1",
  },
];

export const masterRecords = {
  contracts: [
    { id: "CTR-001", name: "Scrap & secondary metals supply 2026", version: "3.2", status: "Active" },
    { id: "CTR-014", name: "Yard weighment & moisture addendum", version: "1.1", status: "Active" },
    { id: "CTR-021", name: "Auction participation & margin rules", version: "2.0", status: "Draft" },
  ],
  rfps: [
    { id: "RFP-882", title: "Annual HMS & shred procurement", owner: "Procurement", status: "Open" },
    { id: "RFP-883", title: "Non-ferrous turnings & borings — Q2", owner: "Sourcing", status: "Review" },
    { id: "RFP-884", title: "Copper scrap grade-A hedge — Q3", owner: "Treasury", status: "Open" },
  ],
  rulesets: [
    { id: "RS-ENG-01", name: "English — open cry with soft close", mechanisms: "English", version: "4.1" },
    { id: "RS-YAN-02", name: "Yankee — pay-as-bid, tie by time", mechanisms: "Yankee", version: "2.3" },
    { id: "RS-DUT-01", name: "Dutch — linear tick, single acceptance", mechanisms: "Dutch", version: "1.8" },
  ],
};

export const kycQueue = [
  { entity: "Nordic Scrap Trading AS", type: "Seller", stage: "Document OCR", risk: "Low", score: 88 },
  { entity: "Chennai Steel Traders", type: "Buyer", stage: "Beneficial owner", risk: "Medium", score: 62 },
  { entity: "Globex Logistics LLP", type: "Both", stage: "Bank verification", risk: "Low", score: 91 },
  { entity: "Mumbai Non-Ferrous Merchants Assn", type: "Seller", stage: "Sanctions re-screen", risk: "Low", score: 84 },
];
