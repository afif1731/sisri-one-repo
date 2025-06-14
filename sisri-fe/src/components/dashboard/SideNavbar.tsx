"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
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
        "sticky hidden w-[350px] md:flex",
        "fixed z-50 flex w-full duration-300 ease-in-out md:hidden",
      ].map((sideNavbarClassName, index) => (
        <div key={index}>
          <div
            className={cn(
              "top-0 min-h-screen flex-col items-center justify-between bg-white py-8 shadow-lg md:translate-x-0",
              sideNavbarClassName,
              openCloseNav
                ? "translate-x-0"
                : "translate-x-[-95%] bg-transparent backdrop-blur-lg",
            )}
          >
            <hgroup className="flex flex-col items-center justify-center gap-4">
              <Link href="/">
                <Image
                  src="/images/LOGO-PRIMARY.png"
                  width={75}
                  height={75}
                  alt="logo"
                />
              </Link>
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

            <IconButton
              className={cn(
                "-traslate-x-1/2 absolute -right-4 top-1/2 flex transform rounded-full md:hidden",
                openCloseNav ? "hidden" : "flex",
              )}
              onClick={onClick}
              icon={FaAngleRight}
              variant="blue"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SideNavbar;
