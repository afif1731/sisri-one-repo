import React from "react";
import { CiGrid41 } from "react-icons/ci";

import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Typography from "@/components/Typography";

const ButtonSection = () => {
  return (
    <>
      <Typography className="text-blue-main" variant="h3" weight="bold">
        Button
      </Typography>
      <br />
      <section className="space-y-2">
        {[
          {
            leftIcon: undefined,
            rightIcon: undefined,
            isLoading: false,
            icon: undefined,
            Component: Button,
          },
          {
            leftIcon: CiGrid41,
            rightIcon: undefined,
            isLoading: false,
            icon: undefined,
            Component: Button,
          },
          {
            leftIcon: undefined,
            rightIcon: CiGrid41,
            isLoading: false,
            icon: undefined,
            Component: Button,
          },
          {
            leftIcon: undefined,
            rightIcon: undefined,
            isLoading: false,
            icon: CiGrid41,
            Component: IconButton,
          },
          {
            leftIcon: undefined,
            rightIcon: undefined,
            isLoading: true,
            icon: undefined,
            Component: Button,
          },
          {
            leftIcon: undefined,
            rightIcon: undefined,
            isLoading: true,
            icon: CiGrid41,
            Component: IconButton,
          },
        ].map((c, index) => (
          <div key={index} className="flex flex-wrap gap-2">
            {(
              ["blue", "red", "green", "yellow", "secondary", "dark"] as const
            ).map((v, index) => (
              <div key={index}>
                {c.icon === undefined ? (
                  <c.Component
                    key={index}
                    variant={v}
                    leftIcon={c.leftIcon}
                    rightIcon={c.rightIcon}
                    isLoading={c.isLoading}
                  >
                    {v}
                  </c.Component>
                ) : (
                  <c.Component
                    key={index}
                    variant={v}
                    icon={c.icon}
                    isLoading={c.isLoading}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  );
};

export default ButtonSection;
