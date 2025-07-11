import { MouseEvent } from "react";

import { PortfolioLink, PortfolioLinkType } from "@/api/types";
import { LINKS_ICONS, LINKS_LABELS } from "@/constants";
import { Badge } from "@/ui/badge";
import { Typography } from "@/ui/Typography";

interface ProjectLinkProps {
  projectLink: PortfolioLink;
  type?: "badge" | "card";
  linkType: PortfolioLinkType;
}

export const ProjectLink = ({
  linkType,
  projectLink,
  type = "card",
}: ProjectLinkProps) => {
  if (!projectLink) {
    return null;
  }

  const icon = LINKS_ICONS[linkType];
  const label = LINKS_LABELS[linkType];

  const onLinkClick = (e: MouseEvent<HTMLSpanElement | HTMLDivElement>) => {
    e.preventDefault();
    window.open(projectLink.url, "_blank", "noopener, noreferrer");
  };

  if (type === "badge") {
    return (
      <Badge
        variant="outline"
        onClick={onLinkClick}
        className="hover:bg-accent transition-all duration-300"
      >
        {icon}
        {label}
      </Badge>
    );
  }

  return (
    <div
      onClick={onLinkClick}
      className="flex gap-x-2 items-center border shadow-sm rounded-md p-2 transition-all duration-200 hover:border-accent-foreground  cursor-pointer"
    >
      {icon}
      <div className="flex flex-col">
        {<Typography text={projectLink.label} type="h6" />}
        <Typography text={projectLink.url} type="xs" />
      </div>
    </div>
  );
};
