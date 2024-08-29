import { LucideIcon } from "lucide-react";
import * as React from "react";
import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

import { cn } from "@/lib/utils";

const IconButtonVariant = [
  "blue",
  "red",
  "green",
  "yellow",
  "secondary",
  "ghost",
  "dark",
] as const;

type IconButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof IconButtonVariant)[number];
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
} & React.ComponentPropsWithRef<"button">;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = "primary",
      // isDarkBg = false,
      icon: Icon,
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
                // 'text-black': ['light'].includes(variant),
                // 'text-primary-500': ['outline', 'ghost'].includes(variant),
              },
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {Icon && <Icon size="1em" className={cn(classNames?.icon)} />}
      </button>
    );
  },
);

export default IconButton;
