import { Metadata } from "next";
import * as React from "react";

import "@/styles/colors.css";

export const metadata: Metadata = {
  title: "Admin",
  description: "Pre-built components with awesome default",
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
