import { LucideIcon } from "lucide-react";
import * as React from "react";
import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

import { cn } from "@/lib/utils";

const ButtonVariant = [
  "blue",
  "red",
  "green",
  "yellow",
  "secondary",
  "dark",
  "ghost",
] as const;
const ButtonSize = ["sm", "base"] as const;

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = "blue",
      size = "base",
      // isDarkBg = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
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
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              {
                "text-white": [
                  "blue",
                  "red",
                  "green",
                  "yellow",
                  "dark",
                ].includes(variant),
                "text-black": ["ghost", "secondary"].includes(variant),
                // 'text-primary-500': ['outline', 'ghost'].includes(variant),
              },
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
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
      </button>
    );
  },
);

export default Button;
