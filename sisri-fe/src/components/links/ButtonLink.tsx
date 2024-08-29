import { LucideIcon } from "lucide-react";
import * as React from "react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

import UnstyledLink, {
  UnstyledLinkProps,
} from "@/components/links/UnstyledLink";

const ButtonLinkVariant = [
  "blue",
  "red",
  "green",
  "yellow",
  "secondary",
  "ghost",
  "dark",
] as const;
const ButtonLinkSize = ["sm", "base"] as const;

type ButtonLinkProps = {
  // isDarkBg?: boolean;
  variant?: (typeof ButtonLinkVariant)[number];
  size?: (typeof ButtonLinkSize)[number];
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "base",
      // isDarkBg = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      ...rest
    },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          "inline-flex items-center rounded font-medium",
          "shadow-sm",
          "transition-colors duration-75",
          //#region  //*=========== Size ===========
          [
            size === "base" && ["px-3 py-1.5", "text-sm md:text-base"],
            size === "sm" && ["px-2 py-1", "text-xs md:text-sm"],
          ],
          //#endregion  //*======== Size ===========
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
            variant === "ghost" && [
              "bg-transparent text-blue-main",
              "hover:bg-blue-50",
              "active:bg-blue-100",
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
      >
        {LeftIcon && (
          <div
            className={cn([
              size === "base" && "mr-1",
              size === "sm" && "mr-1.5",
            ])}
          >
            <LeftIcon
              size="1em"
              className={cn(
                [
                  size === "base" && "md:text-md text-md",
                  size === "sm" && "md:text-md text-sm",
                ],
                classNames?.leftIcon,
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={cn([
              size === "base" && "ml-1",
              size === "sm" && "ml-1.5",
            ])}
          >
            <RightIcon
              size="1em"
              className={cn(
                [
                  size === "base" && "text-md md:text-md",
                  size === "sm" && "md:text-md text-sm",
                ],
                classNames?.rightIcon,
              )}
            />
          </div>
        )}
      </UnstyledLink>
    );
  },
);

export default ButtonLink;
