export const RoleCode = {
  ADMIN: "ADMIN",
  CHIEF: "CHIEF",
  FREELANCER: "FREELANCER",
} as const;

export type RoleCode = (typeof RoleCode)[keyof typeof RoleCode];

export const Roles = {
  [RoleCode.ADMIN]: {
    id: "admin-role",
    name: "Administrator",
    code: RoleCode.ADMIN,
  },
  [RoleCode.CHIEF]: { id: "chief-role", name: "Chief", code: RoleCode.CHIEF },
  [RoleCode.FREELANCER]: {
    id: "freelancer-role",
    name: "Freelancer",
    code: RoleCode.FREELANCER,
  },
} as const;

export type RoleDefinition = (typeof Roles)[keyof typeof Roles];
