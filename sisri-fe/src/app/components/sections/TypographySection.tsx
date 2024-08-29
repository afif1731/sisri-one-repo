import React from "react";

import Typography from "@/components/Typography";

const TypographySection = () => {
  return (
    <>
      <Typography className="text-blue-main" variant="h3" weight="bold">
        Typography
      </Typography>
      <br />
      <div className="space-y-4">
        {(["h1", "h2", "h3", "bl", "bm", "bs"] as const).map((v, index) => (
          <div key={index} className="space-y-4">
            {(["medium", "semibold", "bold"] as const).map((w, index) => (
              <Typography key={index} variant={v} weight={w}>
                {v} {w}
              </Typography>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TypographySection;
