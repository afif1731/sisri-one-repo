import { LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

import Typography from "@/components/Typography";

export enum CardVariant {
  blue,
  red,
  green,
}

interface CardProps {
  variant: keyof typeof CardVariant;
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
  title: string;
  desc: string;
  num: string;
}

const Card = ({
  variant,
  icon: Icon,
  classNames,
  title,
  desc,
  num,
}: CardProps) => {
  return (
    <>
      <div
        className={cn(
          "relative w-full space-y-4 rounded-md p-8 pb-16 text-white",
          variant === "blue" && ["bg-blue-main"],
          variant === "red" && ["bg-red-main"],
          variant === "green" && ["bg-green-main"],
        )}
      >
        <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-slate-100 opacity-30" />
        <div className="absolute bottom-0 left-0 h-16 w-16 rounded-tr-full bg-slate-100 opacity-30" />
        <div className="inline-flex items-center justify-center gap-2">
          {Icon && <Icon size="1.5em" className={cn(classNames?.icon)} />}
          <Typography variant="bl" weight="semibold">
            {title}
          </Typography>
        </div>
        <Typography className="!text-base">{desc}</Typography>
        <Typography className="!text-[72px]" variant="h1" weight="bold">
          {num}
        </Typography>
      </div>
    </>
  );
};

export default Card;
