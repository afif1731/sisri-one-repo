import * as React from "react";

import { cn } from "@/lib/utils";

export enum TypographyVariant {
  "h1",
  "h2",
  "h3",
  "bl",
  "bm",
  "bs",
}

enum FontVariant {
  "Montserrat",
}

enum FontWeight {
  "medium",
  "semibold",
  "bold",
}

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  weight?: keyof typeof FontWeight;
  font?: keyof typeof FontVariant;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};

export default function Typography<T extends React.ElementType>({
  as,
  children,
  weight = "medium",
  className,
  font = "Montserrat",
  variant = "bs",
  ...props
}: TypographyProps<T> &
  Omit<React.ComponentProps<T>, keyof TypographyProps<T>>) {
  const Component = as || "p";
  return (
    <Component
      className={cn(
        // *=============== Font Type ==================
        [
          font === "Montserrat" && [
            "font-montserrat",
            [
              weight === "medium" && "font-medium",
              weight === "semibold" && "font-semibold",
              weight === "bold" && "font-bold",
            ],
          ],
        ],
        // *=============== Font Variants ==================
        [
          variant === "h1" && [
            "text-[36px] leading-[2.5rem] md:text-[72px] md:leading-[4.5rem]",
          ],
          variant === "h2" && [
            "text-[24px] leading-[2rem] md:text-[48px] md:leading-[3rem]",
          ],
          variant === "h3" && [
            "text-[18px] leading-[1.75rem] md:text-[30px] md:leading-[2.25rem]",
          ],
          variant === "bl" && [
            "text-[16px] leading-[1.5rem] md:text-[24px] md:leading-[2.2rem]",
          ],
          variant === "bm" && [
            "text-[14px] leading-[1.25rem] md:text-[20px] md:leading-[1.75rem]",
          ],
          variant === "bs" && [
            "text-[12px] leading-[1rem] md:text-[18px] md:leading-[1.5rem]",
          ],
        ],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
