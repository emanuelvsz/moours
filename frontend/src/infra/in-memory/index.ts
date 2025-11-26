import type { Project } from "../../core/domain/project";
import { RoleCode, Roles } from "../../core/domain/role";
import type { UserProfile } from "../../core/domain/user-profile";
import type { WorkSession } from "../../core/domain/work-session";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "RAG Implementation",
    clientName: "Tech Corp",
    hourlyRate: 8.0,
    currency: "€",
    ownerId: "chief-1",
  },
  {
    id: "p2",
    name: "Website Redesign",
    clientName: "Design Studio",
    hourlyRate: 12.5,
    currency: "€",
    ownerId: "chief-1",
  },
];

export const INITIAL_SESSIONS: WorkSession[] = [
  {
    id: "s1",
    projectId: "p1",
    userId: "u1",
    date: "2024-09-11",
    startTime: "04:00",
    endTime: "05:30",
    description: "Creating embeddings strategy",
    calculatedAmount: 12.0,
  },
  {
    id: "s2",
    projectId: "p1",
    userId: "u1",
    date: "2024-09-12",
    startTime: "09:00",
    endTime: "12:00",
    description: "Meeting with crew",
    calculatedAmount: 24.0,
  },
  {
    id: "s3",
    projectId: "p2",
    userId: "u1",
    date: "2024-09-13",
    startTime: "14:00",
    endTime: "16:00",
    description: "Figma to React conversion",
    calculatedAmount: 25.0,
  },
  {
    id: "s4",
    projectId: "p1",
    userId: "u1",
    date: "2024-09-14",
    startTime: "08:00",
    endTime: "10:00",
    description: "Fixing bugs in production",
    calculatedAmount: 16.0,
  },
];

export const MOCK_FREELANCER: UserProfile = {
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

export const MOCK_CHIEF: UserProfile = {
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