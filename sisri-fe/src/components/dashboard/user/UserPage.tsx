"use client";
import { LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { CiGrid41, CiMail } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";
// import { IoIosWarning } from "react-icons/io";
import { SiGooglemaps } from "react-icons/si";

import SideButton from "@/components/dashboard/SideButton";
import SideNavbar from "@/components/dashboard/SideNavbar";
import Typography from "@/components/Typography";

type SideNavItem = {
  text: string;
  icon?: IconType | LucideIcon;
  href: string;
};

const items: SideNavItem[][] = [
  [
    { text: "Overview", icon: CiGrid41, href: "/user/overview" },
    {
      text: "Riwayat Pembayaran",
      icon: FaHistory,
      href: "/user/riwayat-pembayaran",
    },
    // { text: "Pelanggaran", icon: IoIosWarning, href: "/user/pelanggaran" },
  ],
  [
    {
      text: "Maps",
      icon: SiGooglemaps,
      href: "/maps",
    },
    { text: "Pengaduan", icon: CiMail, href: "/user/pengaduan" },
  ],
];

const UserPage = () => {
  const [openCloseNav, setOpenCloseNav] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        <SideNavbar
          onClick={() => setOpenCloseNav(!openCloseNav)}
          openCloseNav={openCloseNav}
          status="User"
        >
          {items.map((item, indexItem) => (
            <hgroup className="w-full space-y-4" key={indexItem}>
              <Typography className="pl-8 !text-base text-zinc-400">
                {indexItem === 0 ? "Main Menu" : "Other Menu"}
              </Typography>
              <section>
                {item.map((i: SideNavItem, indexI) => (
                  <div key={indexI}>
                    <SideButton
                      href={i.href}
                      openNewTab={false}
                      className="text-black hover:bg-slate-100"
                      icon={i.icon}
                    >
                      {i.text}
                    </SideButton>
                  </div>
                ))}
              </section>
            </hgroup>
          ))}
        </SideNavbar>
      </div>
    </>
  );
};

export default UserPage;
