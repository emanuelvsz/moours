export const DomainService = {
  generateId: () => Math.random().toString(36).substr(2, 9),
  formatCurrency: (amount: number, currencySymbol: string = "€") => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currencySymbol === "€" ? "EUR" : "BRL",
    }).format(amount);
  },
  formatDate: (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  },
  calculateWorkSession: (start: string, end: string, hourlyRate: number) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    let diffInMinutes = endH * 60 + endM - (startH * 60 + startM);
    if (diffInMinutes < 0) diffInMinutes += 24 * 60;

    const hours = diffInMinutes / 60;
    return {
      hours,
      amount: hours * hourlyRate,
      durationLabel: `${Math.floor(hours)}h ${diffInMinutes % 60}m`,
    };
  },
};
