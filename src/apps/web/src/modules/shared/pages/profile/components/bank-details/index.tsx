import { UserProfile } from "@core/domain/user-profile";
import DetailCard from "@web/components/detail-card";
import { Banknote, MapPin, TrendingUp } from "lucide-react";

interface Props {
  user?: UserProfile | null;
}

export const BankDetails = ({ user }: Props) => {
  if (!user?.bankDetails) {
    return null;
  }

  return (
    <>
      <h3 className="text-xl font-bold text-slate-800 mt-4">Bank Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DetailCard
          icon={<Banknote size={20} />}
          title="Bank"
          value={user?.bankDetails.bankName}
        />
        <DetailCard
          icon={<Banknote size={20} />}
          title="Account"
          value={user?.bankDetails.accountNumber}
        />
        <DetailCard
          icon={<MapPin size={20} />}
          title="Agency"
          value={user?.bankDetails.branchCode}
        />
        <DetailCard
          icon={<TrendingUp size={20} />}
          title="Payment Link"
          value={user?.bankDetails.paymentLink}
        />
      </div>
    </>
  );
};
