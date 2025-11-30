import { PaymentStatus } from "./payment-status";

export interface Payment {
  id: string;
  chiefId: string;
  freelancerId: string;

  month: number;
  year: number;

  // --- Bloco 1: O Valor Original (Baseado nas WorkSessions) ---
  originalAmount: number;
  originalCurrency: string;

  // --- Bloco 2: A Conversão (Snapshot financeiro) ---
  exchangeRate?: number;
  exchangeRateDate?: string;
  expectedRealProfit?: number;

  // --- Bloco 3: A Execução (O que realmente aconteceu) ---
  paidAmount?: number;
  paidCurrency?: string;
  paidAt?: string;

  status: PaymentStatus;
  createdAt: string;

  description?: string;
}
