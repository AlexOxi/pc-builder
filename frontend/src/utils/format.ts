const formatter = new Intl.NumberFormat("sk-SK", {
  style: "currency",
  currency: "EUR",
});

export function formatCurrency(amount: number): string {
  return formatter.format(amount);
}

