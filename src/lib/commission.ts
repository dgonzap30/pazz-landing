export interface CommissionLevel {
  name: string;
  minAccumulated: number;
  maxAccumulated: number | null;
  rate: number;
  color: string;
}

export const LEVELS: CommissionLevel[] = [
  { name: "Bronce", minAccumulated: 0, maxAccumulated: 3_000_000, rate: 0.01, color: "#CD7F32" },
  { name: "Plata", minAccumulated: 3_000_000, maxAccumulated: 9_000_000, rate: 0.015, color: "#C0C0C0" },
  { name: "Oro", minAccumulated: 9_000_000, maxAccumulated: null, rate: 0.02, color: "#FFD700" },
];

export function getLevel(accumulated: number): CommissionLevel {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (accumulated >= LEVELS[i].minAccumulated) return LEVELS[i];
  }
  return LEVELS[0];
}

export function calculateCommission(accumulated: number, currentMonth: number) {
  const level = getLevel(accumulated);
  return { level, commission: currentMonth * level.rate };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
