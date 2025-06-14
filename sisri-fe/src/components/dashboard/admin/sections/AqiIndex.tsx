import React from "react";

import Typography from "@/components/Typography";

const AqiIndex = ({
  icon,
  title,
  unit,
  value,
  ...rest
}: {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  icon: any;
  title: string | React.ReactElement;
  value: string;
  unit: React.ReactElement | string;
}) => {
  return (
    <>
      <div
        {...rest}
        className="flex justify-between rounded-lg bg-blue-active/30 p-6"
      >
        <div className="flex justify-center">
          {typeof icon === "string" || typeof icon === "object" ? (
            <Typography
              weight="bold"
              className="flex items-center justify-center rounded-lg bg-blue-main p-4 text-white"
            >
              {icon}
            </Typography>
          ) : (
            icon && (
              <div className="flex items-center justify-center rounded-lg bg-blue-main p-4 text-3xl text-white">
                {React.createElement(icon, { size: "1em" })}
              </div>
            )
          )}
        </div>
        <div className="flex flex-col justify-center space-y-2 text-right">
          <Typography className="text-lg">{title}</Typography>
          <Typography className="text-xl" weight="bold">
            {value.toString().length > 6 ? value.toString().slice(0, 6) : value}{" "}
            {unit}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default AqiIndex;
