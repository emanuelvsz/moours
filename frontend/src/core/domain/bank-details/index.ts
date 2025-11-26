export interface BankDetails {
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountType: "Corrente" | "Poupança";
  paymentLink: string;
}
