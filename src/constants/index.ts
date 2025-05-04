import { Role } from "@/types/enums";

export const ROLES_TEXT: Record<Role, string> = {
  [Role.FRONT_DEV]: "Front-end developer",
  [Role.BACK_DEV]: "Back-end developer",
  [Role.QA_ENGINEER]: "QA engineer",
  [Role.DESIGNER]: "Designer",
  [Role.HR]: "HR",
  [Role.MANAGER]: "Manager",
};

export const ROLES = Object.values(Role);

export const ROLES_OPTIONS = ROLES.map((value) => ({
  value: value,
  label: ROLES_TEXT[value],
}));
