import { RoleCode, Roles } from "../../../core/domain/role";
import type { UserProfile } from "../../../core/domain/user-profile";

export const createMockedFreelancerUserProfile = (): UserProfile => {
  return {
    id: "u1",
    fullName: "Emanuel Vilela",
    email: "emanuel@moours.com",
    phone: "555-0101",
    birthDate: "2004-03-02",
    taxId: "105.539.714-09",
    address: "Francisco Alves de Melo, 91",
    role: Roles[RoleCode.FREELANCER],
    bankDetails: {
      bankName: "Revolut",
      accountNumber: "12345678",
      branchCode: "001",
      accountType: "Corrente",
      paymentLink: "revolut.me/emanuel",
    },
  };
};

export const createMockedChiefUserProfile = (): UserProfile => {
  return {
    id: "c1",
    fullName: "Rodolfo Manager",
    email: "rodolfo@moours.com",
    phone: "555-9999",
    birthDate: "1985-05-20",
    role: Roles[RoleCode.CHIEF],
    bankDetails: {
      bankName: "Inter",
      accountNumber: "999999",
      branchCode: "0001",
      accountType: "Corrente",
      paymentLink: "inter.me/rodolfo",
    },
  };
};
