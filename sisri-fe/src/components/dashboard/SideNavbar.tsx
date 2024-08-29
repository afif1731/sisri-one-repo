"use client";
import Image from "next/image";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

import { cn } from "@/lib/utils";

import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Typography from "@/components/Typography";

const SideNavbar = ({
  children,
  onClick,
  openCloseNav,
  status,
}: {
  children: React.ReactNode;
  onClick: () => void;
  openCloseNav: boolean;
  status: string;
}) => {
  return (
    <>
      {[
        "sticky top-0 hidden min-h-screen flex-col items-center justify-between bg-white py-8 shadow-lg md:flex w-[350px] md:translate-x-0",
        "md:hidden min-h-screen w-full flex-col items-center justify-between top-0 bg-white py-8 shadow-lg flex fixed z-50 duration-300 ease-in-out w-full md:translate-x-0",
      ].map((sideNavbarClassName, index) => (
        <div key={index}>
          <div
            className={cn(
              sideNavbarClassName,
              openCloseNav ? "translate-x-0" : "translate-x-[-100%]",
            )}
          >
            <hgroup className="flex flex-col items-center justify-center gap-4">
              <Image
                src="/images/LOGO-PRIMARY.png"
                width={75}
                height={75}
                alt="logo"
              />
              <Typography className="!text-base">
                SISRI Dashboard {status}
              </Typography>
            </hgroup>
            {children}
            <Button leftIcon={CiLogout} variant="ghost">
              Logout
            </Button>

            <IconButton
              className="flex md:hidden"
              onClick={onClick}
              icon={IoMdClose}
              variant="red"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SideNavbar;
