"use client";
import React, { useState } from "react";
import { CiDark } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";

import IconButton from "@/components/buttons/IconButton";
import Typography from "@/components/Typography";

import ButtonLinkSection from "@/app/components/sections/ButtonLinkSection";
import ButtonSection from "@/app/components/sections/ButtonSection";
import CardSection from "@/app/components/sections/CardSection";
import FormSection from "@/app/components/sections/FormSection";
import TypographySection from "@/app/components/sections/TypographySection";

const Page = () => {
  const [darkMode, isDarkMode] = useState<boolean>(false);

  return (
    <div className={`${darkMode && "bg-[#222222] text-white"} space-y-8 p-8`}>
      <header className="space-y-4">
        <Typography variant="h2" weight="bold">
          Build-in Components
        </Typography>
        <IconButton
          icon={darkMode ? MdOutlineLightMode : CiDark}
          onClick={() => isDarkMode(!darkMode)}
          variant={darkMode ? "dark" : "secondary"}
        />
      </header>
      {[
        TypographySection,
        ButtonSection,
        ButtonLinkSection,
        FormSection,
        CardSection,
      ].map((item, index) => (
        <hgroup key={index}>{item()}</hgroup>
      ))}
    </div>
  );
};

export default Page;
