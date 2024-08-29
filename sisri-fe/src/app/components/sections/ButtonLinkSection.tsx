import React from "react";
import { CiGrid41 } from "react-icons/ci";

import ButtonLink from "@/components/links/ButtonLink";
import IconLink from "@/components/links/IconLink";
import Typography from "@/components/Typography";

const ButtonLinkSection = () => {
  return (
    <>
      <Typography className="text-blue-main" variant="h3" weight="bold">
        Button Link
      </Typography>
      <br />
      <section className="space-y-2">
        {[
          {
            leftIcon: undefined,
            rightIcon: undefined,
            isLoading: false,
            icon: undefined,
            openNewTab: false,
            Component: ButtonLink,
          },
          {
            leftIcon: CiGrid41,
            rightIcon: undefined,
            isLoading: false,
            icon: undefined,
            openNewTab: false,
            Component: ButtonLink,
          },
          {
            leftIcon: undefined,
            rightIcon: CiGrid41,
            isLoading: false,
            icon: undefined,
            openNewTab: true,
            Component: ButtonLink,
          },
          {
            leftIcon: undefined,
            rightIcon: undefined,
            isLoading: false,
            icon: CiGrid41,
            openNewTab: false,
            Component: IconLink,
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
                    href="/components"
                    openNewTab={c.openNewTab}
                  >
                    {v}
                  </c.Component>
                ) : (
                  <c.Component
                    key={index}
                    variant={v}
                    icon={c.icon}
                    href="/components"
                    openNewTab={c.openNewTab}
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

export default ButtonLinkSection;
