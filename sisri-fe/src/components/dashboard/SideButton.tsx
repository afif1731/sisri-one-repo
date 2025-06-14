import { LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

import UnstyledLink, {
  UnstyledLinkProps,
} from "@/components/links/UnstyledLink";
import Typography from "@/components/Typography";

export type SideButtonProps = {
  children: React.ReactNode;
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
  className: string;
} & UnstyledLinkProps;

const SideButton = ({
  icon: Icon,
  classNames,
  className,
  children,
  ...rest
}: SideButtonProps) => {
  return (
    <>
      <UnstyledLink
        type="button"
        {...rest}
        className={cn(
          "inline-flex w-full items-center gap-2 py-3 pl-8",
          className,
        )}
      >
        {Icon && <Icon size="1em" className={cn(classNames?.icon)} />}
        <Typography className="!text-sm">{children}</Typography>
      </UnstyledLink>
    </>
  );
};

export default SideButton;
