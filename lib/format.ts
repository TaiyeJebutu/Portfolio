const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-03-18" → "Mar 2026"; "2024" → "2024". Deterministic, so server and client agree. */
export function formatDate(d: string) {
  const [y, m] = d.split("-");
  return m ? `${months[Number(m) - 1]} ${y}` : y;
}

/** Date for an evidence item: "c. 2024" when the date is approximate, otherwise "Mar 2026". */
export function itemDate(item: { date: string; year: string; approx: boolean }) {
  return item.approx ? `c. ${item.year}` : formatDate(item.date);
}
