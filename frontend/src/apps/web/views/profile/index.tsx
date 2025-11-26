import {
  Badge,
  Banknote,
  Briefcase,
  Calendar,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
} from "lucide-react";
import DetailCard from "../../components/detail-card";
import { DomainService } from "../../../../core/services/domain";
import type { UserProfile } from "../../../../core/domain/user-profile";
import { RoleCode } from "../../../../core/domain/role";

const ProfileView: React.FC<{ user: UserProfile }> = ({ user }) => (
  <div className="p-8 space-y-8">
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl ring-4 ring-emerald-50">
          {user.fullName.charAt(0)}
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            {user.fullName}
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <Badge
              color={
                user.role.code === RoleCode.ADMIN
                  ? "red"
                  : user.role.code === RoleCode.CHIEF
                  ? "purple"
                  : "blue"
              }
            >
              {user.role.name}
            </Badge>
            <span className="text-slate-500 text-sm">ID: {user.id}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DetailCard icon={<Mail size={20} />} title="Email" value={user.email} />
      <DetailCard
        icon={<Phone size={20} />}
        title="Telefone"
        value={user.phone}
      />
      <DetailCard
        icon={<Calendar size={20} />}
        title="Nascimento"
        value={DomainService.formatDate(user.birthDate)}
      />
      {user.taxId && (
        <DetailCard
          icon={<Briefcase size={20} />}
          title="CPF/Tax ID"
          value={user.taxId}
        />
      )}
    </div>

    {user.bankDetails && (
      <>
        <h3 className="text-xl font-bold text-slate-800 mt-4">
          Dados Bancários
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailCard
            icon={<Banknote size={20} />}
            title="Banco"
            value={user.bankDetails.bankName}
          />
          <DetailCard
            icon={<Banknote size={20} />}
            title="Conta"
            value={user.bankDetails.accountNumber}
          />
          <DetailCard
            icon={<MapPin size={20} />}
            title="Agência"
            value={user.bankDetails.branchCode}
          />
          <DetailCard
            icon={<TrendingUp size={20} />}
            title="Link Pagamento"
            value={user.bankDetails.paymentLink}
          />
        </div>
      </>
    )}
  </div>
);

export default ProfileView;
