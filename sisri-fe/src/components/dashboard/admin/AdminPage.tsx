import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { BsSpeedometer2 } from "react-icons/bs";
import { CiGrid41, CiLocationOn } from "react-icons/ci";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";
import { IoIosWarning } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbTrafficLights } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";

import { cn } from "@/lib/utils";

import AqiIndex from "@/components/dashboard/admin/sections/AqiIndex";
import SideButton from "@/components/dashboard/SideButton";
import SideNavbar from "@/components/dashboard/SideNavbar";
// import TopNavbar from "@/components/dashboard/TopNavbar";
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

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          "/si-road/road/" +
          process.env.NEXT_PUBLIC_ID +
          "/air-quality",
      );
      const data = response.data.data;
      return data;
    },
  });

  const aqiItems = [
    {
      icon: FaTemperatureHigh,
      title: "Temperature",
      value: postQuery.data?.temperature,
      unit: "°C",
    },
    {
      icon: BsSpeedometer2,
      title: "Pressure",
      value: postQuery.data?.pressure,
      unit: "Pa",
    },
    {
      icon: WiHumidity,
      title: "Humidity",
      value: postQuery.data?.humidity,
      unit: "%Rh",
    },

    {
      icon: (
        <>
          PM<sub>10</sub>
        </>
      ),
      title: (
        <>
          PM<sub>10</sub>
        </>
      ),
      value: postQuery.data?.pm10,
      unit: (
        <>
          μm/g<sup>3</sup>
        </>
      ),
    },
    {
      icon: (
        <>
          PM<sub>2.5</sub>
        </>
      ),
      title: (
        <>
          PM<sub>2.5</sub>
        </>
      ),
      value: postQuery.data?.pm25,
      unit: (
        <>
          μm/g<sup>3</sup>
        </>
      ),
    },
    {
      icon: (
        <>
          PM<sub>1</sub>
        </>
      ),
      title: (
        <>
          PM<sub>1</sub>
        </>
      ),
      value: postQuery.data?.pm1,
      unit: (
        <>
          μm/g<sup>3</sup>
        </>
      ),
    },

    {
      icon: "CO",
      title: "CO",
      value: postQuery.data?.co,
      unit: (
        <>
          μm/g<sup>3</sup>
        </>
      ),
    },
    {
      icon: (
        <>
          NO<sub>2</sub>
        </>
      ),
      title: (
        <>
          NO<sub>2</sub>
        </>
      ),
      value: postQuery.data?.no2,
      unit: (
        <>
          μm/g<sup>3</sup>
        </>
      ),
    },
    {
      icon: (
        <>
          O<sub>3</sub>
        </>
      ),
      title: (
        <>
          O<sub>3</sub>
        </>
      ),
      value: postQuery.data?.ozone,
      unit: (
        <>
          μm/g<sup>3</sup>
        </>
      ),
    },
  ];

  if (postQuery.isLoading) return <>Loading...</>;
  if (postQuery.isError) return <>Error loading data!!!</>;

  return (
    <>
      <div className="flex">
        {/* <TopNavbar onClick={() => setOpenCloseNav(!openCloseNav)} /> */}
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
        <section className="mx-auto flex min-h-screen w-full flex-col space-y-4 p-8">
          {/* <div className="flex items-center justify-end gap-2">
            <CiLocationOn />
            <Typography>Jl. Raya Kertajaya Indah</Typography>
          </div> */}
          <div className="relative flex justify-between rounded-lg bg-blue-active/30 p-6">
            <div className="space-y-16">
              <Typography className="text-lg">Indeks Kualitas Udara</Typography>
              <Typography
                variant="h2"
                weight="semibold"
                className={cn(
                  postQuery.data.quality === "GOOD" ? "text-[#17C964]" : "",
                  "text-6xl",
                )}
              >
                {postQuery.data.aqi}
              </Typography>
            </div>
            <div className="absolute bottom-0 right-6">
              <Image
                src="/images/map-icon.png"
                alt="smart-air-quality"
                width={300}
                height={300}
                className="w-[175px] md:w-[300px]"
              ></Image>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {aqiItems.map((aqiItem, index) => (
              <AqiIndex
                key={index}
                icon={aqiItem.icon}
                title={aqiItem.title}
                unit={aqiItem.unit}
                value={aqiItem.value}
              ></AqiIndex>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminPage;
