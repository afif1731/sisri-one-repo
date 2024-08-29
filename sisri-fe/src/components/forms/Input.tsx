import React, { useState } from "react";
import { get, RegisterOptions, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import HelperText from "@/components/forms/HelperText";
import LabelText from "@/components/forms/LabelText";

export type InputProps = {
  id: string;
  label?: string;
  helperText?: React.ReactNode;
  helperTextClassName?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  rightIcon?: IconType;
  leftIcon?: IconType;
  rightIconClassName?: string;
  leftIconClassName?: string;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  type = "text",
  readOnly = false,
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  rightIconClassName,
  leftIconClassName,
  helperTextClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const error = get(errors, id);

  return (
    <div className="w-full space-y-2">
      {label && (
        <LabelText required={validation?.required ? true : false}>
          {label}
        </LabelText>
      )}

      <div className="relative flex w-full gap-0">
        <div
          className={cn(
            "pointer-events-none absolute h-full w-full",
            "border-neutral-dark ring-neutral-dark rounded ring-1 ring-inset",
          )}
        />

        <div className={cn("relative w-full rounded")}>
          {LeftIcon && (
            <div
              className={cn(
                "absolute left-0 top-0 h-full",
                "flex items-center justify-center pl-2.5",
                "text-neutral-dark text-lg md:text-xl",
                "text-black",
                leftIconClassName,
              )}
            >
              <LeftIcon />
            </div>
          )}

          <input
            {...register(id, validation)}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            id={id}
            name={id}
            readOnly={readOnly}
            disabled={readOnly}
            className={cn(
              "border-neutral-dark h-full w-full rounded border px-4 py-2.5 md:py-3.5",
              [LeftIcon && "pl-9", RightIcon && "pr-9"],
              "focus:outline-1 focus:ring-inset focus:ring-blue-main",
              "text-[12px] md:text-[14px] lg:text-[16px]",
              "text-black",
              "hover:ring-neutral-dark hover:ring-1 hover:ring-inset",
              "placeholder:text-[12px] md:placeholder:text-[14px] lg:placeholder:text-[16px]",
              "placeholder:text-neutral-dark focus:placeholder:text-blue-mainring-blue-main",
              readOnly && "cursor-not-allowed",
              error && [
                "bg-neutral-light border-none ring-2 ring-inset",
                "placeholder:text-red-mring-red-main ring-red-main focus:ring-red-main",
                "focus:placeholder:text-red-mring-red-main",
                "hover:ring-red-main",
              ],
              className,
            )}
            aria-describedby={id}
            {...rest}
          />

          {RightIcon && type !== "password" && (
            <div
              className={cn(
                "absolute bottom-0 right-0 h-full",
                "flex items-center justify-center pr-3",
                "text-neutral-dark text-lg md:text-xl",
                "text-black",
                rightIconClassName,
              )}
            >
              <RightIcon />
            </div>
          )}

          {type === "password" && (
            <div
              className={cn(
                "absolute bottom-0 right-0 h-full",
                "flex items-center justify-center pr-3",
                "text-neutral-dark text-lg md:text-xl",
                "text-black",
                rightIconClassName,
              )}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEye /> : <HiEyeOff />}
            </div>
          )}
        </div>
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {helperText && (
        <HelperText helperTextClassName={helperTextClassName}>
          {helperText}
        </HelperText>
      )}
    </div>
  );
}
