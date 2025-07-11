import { ReactElement } from "react";
import { Code, ExternalLink } from "lucide-react";

import { PostType } from "@/api/posts/postsTypes";
import { PortfolioLinkType } from "@/api/types";
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
  value,
  label: ROLES_TEXT[value],
}));

export const DIRECTION_TEXT: Record<Role, string> = {
  [Role.FRONT_DEV]: "Frontend",
  [Role.BACK_DEV]: "Backend",
  [Role.QA_ENGINEER]: "QA",
  [Role.DESIGNER]: "Design",
  [Role.HR]: "HR",
  [Role.MANAGER]: "Manage",
};

export const POST_TYPE_TEXT: Record<PostType, string> = {
  [PostType.CONTENT]: "Content",
  [PostType.EVENT]: "Event",
  [PostType.JOB]: "Job",
};

export const DIRECTION_OPTIONS = ROLES.map((value) => ({
  value,
  label: DIRECTION_TEXT[value],
}));

export const TYPE_OPTIONS = Object.values(PostType).map((value) => ({
  value,
  label: POST_TYPE_TEXT[value],
}));

export const LINKS_LABELS: Record<PortfolioLinkType, string> = {
  code: "Code",
  preview: "Preview",
  other: "Other",
};

export const LINKS_ICONS: Record<PortfolioLinkType, ReactElement> = {
  code: <Code />,
  preview: <ExternalLink />,
  other: <ExternalLink />,
};

export const LINKS_TYPES_OPTIONS = Object.values(PortfolioLinkType).map(
  (value) => ({
    value,
    label: LINKS_LABELS[value],
  }),
);
