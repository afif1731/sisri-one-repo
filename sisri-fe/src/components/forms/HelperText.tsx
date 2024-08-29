import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import Typography from "@/components/Typography";

export default function HelperText({
  children,
  helperTextClassName,
}: {
  children: ReactNode;
  helperTextClassName?: string;
}) {
  return (
    <div className="flex space-x-1">
      <Typography
        weight="medium"
        variant="bs"
        className={cn(
          "text-neutral-dark text-[12px] text-xs !leading-tight md:text-[14px] lg:text-[16px]",
          helperTextClassName,
        )}
      >
        {children}
      </Typography>
    </div>
  );
}
