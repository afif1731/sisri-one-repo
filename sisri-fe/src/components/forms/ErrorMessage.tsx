import Typography from "@/components/Typography";

export default function ErrorMessage({ children }: { children: string }) {
  return (
    <div className="flex space-x-1">
      <Typography
        weight="medium"
        variant="bs"
        className="text-[12px] !leading-tight text-red-main md:text-[14px] lg:text-[16px]"
      >
        {children}
      </Typography>
    </div>
  );
}
