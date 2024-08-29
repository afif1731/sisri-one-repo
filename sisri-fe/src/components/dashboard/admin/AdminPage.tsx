"use client";
import { LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { CiGrid41, CiLocationOn } from "react-icons/ci";
import { GiCctvCamera } from "react-icons/gi";
import { IoIosWarning } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbTrafficLights } from "react-icons/tb";

import SideButton from "@/components/dashboard/SideButton";
import SideNavbar from "@/components/dashboard/SideNavbar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import Typography from "@/components/Typography";

type SideNavItem = {
  text: string;
  icon?: IconType | LucideIcon;
  href: string;
};

const items: SideNavItem[][] = [
  [
    { text: "Overview", icon: CiGrid41, href: "/overview" },
    { text: "SI-ROAD", icon: CiLocationOn, href: "/si-road" },
    { text: "SI-TRAFFIC", icon: TbTrafficLights, href: "/si-taffic" },
  ],
  [
    { text: "CCTV", icon: GiCctvCamera, href: "/cctv" },
    { text: "Pelanggaran", icon: IoIosWarning, href: "/pelanggaran" },
    {
      text: "Kondisi Lalu Lintas",
      icon: IoIosInformationCircleOutline,
      href: "/kondisi-lalu-lintas",
    },
  ],
];

const AdminPage = () => {
  const [openCloseNav, setOpenCloseNav] = useState<boolean>(false);

  return (
    <>
      <TopNavbar onClick={() => setOpenCloseNav(!openCloseNav)} />
      <SideNavbar
        onClick={() => setOpenCloseNav(!openCloseNav)}
        openCloseNav={openCloseNav}
        status="Admin"
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
    </>
  );
};

export default AdminPage;
