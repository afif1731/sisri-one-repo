import { LucideIcon } from "lucide-react";
import * as React from "react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

import UnstyledLink, {
  UnstyledLinkProps,
} from "@/components/links/UnstyledLink";

const IconLinkVariant = [
  "blue",
  "red",
  "green",
  "yellow",
  "secondary",
  "dark",
] as const;

type IconLinkProps = {
  // isDarkBg?: boolean;
  variant?: (typeof IconLinkVariant)[number];
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
} & Omit<UnstyledLinkProps, "children">;

const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      className,
      icon: Icon,
      variant = "outline",
      // isDarkBg = false,
      classNames,
      ...rest
    },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded font-medium",
          "shadow-sm",
          "transition-colors duration-75",
          "min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2",
          //#region  //*=========== Variants ===========
          [
            variant === "blue" && [
              "bg-blue-main text-white",
              "hover:bg-blue-hover hover:text-white",
              "active:bg-blue-active",
            ],
            variant === "red" && [
              "bg-red-main text-white",
              "hover:bg-red-hover hover:text-white",
              "active:bg-red-active",
            ],
            variant === "green" && [
              "bg-green-main text-white",
              "hover:bg-green-hover hover:text-white",
              "active:bg-green-active",
            ],
            variant === "yellow" && [
              "bg-yellow-main text-white",
              "hover:bg-yellow-hover hover:text-white",
              "active:bg-yellow-active",
            ],
            variant === "secondary" && [
              "bg-white text-black",
              "border border-blue-main",
              "hover:bg-secondary-hover hover:text-black",
              "active:bg-secondary-active",
            ],
            variant === "dark" && [
              "bg-gray-900 text-white",
              "border border-gray-600",
              "hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700",
            ],
          ],
          //#endregion  //*======== Variants ===========
          "disabled:cursor-not-allowed",
          className,
        )}
        {...rest}
      >
        {Icon && <Icon size="1em" className={cn(classNames?.icon)} />}
      </UnstyledLink>
    );
  },
);

export default IconLink;
