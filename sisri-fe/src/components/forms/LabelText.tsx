import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import Typography from "@/components/Typography";

export default function LabelText({
  children,
  labelTextClasname,
  required,
}: {
  children: ReactNode;
  labelTextClasname?: string;
  required?: boolean;
}) {
  return (
    <label>
      <Typography
        variant="bs"
        weight="semibold"
        className={cn(
          "text-neutral-dark",
          "text-[14px] md:text-[16px] lg:text-[18px]",
          labelTextClasname,
        )}
      >
        {children} {required && <span className="text-red-main">*</span>}
      </Typography>
    </label>
  );
}
