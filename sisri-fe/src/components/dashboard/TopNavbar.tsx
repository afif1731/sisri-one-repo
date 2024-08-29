import Image from "next/image";
import React from "react";
import { IoMdMenu } from "react-icons/io";

import IconButton from "@/components/buttons/IconButton";

const TopNavbar = ({ onClick }: { onClick: () => void }) => {
  return (
    <nav>
      <div className="flex w-full justify-between bg-white px-8 py-4 shadow-lg md:hidden">
        <div>
          <Image
            src="/images/LOGO-PRIMARY.png"
            width={37.5}
            height={37.5}
            alt="logo"
          />
        </div>
        <IconButton icon={IoMdMenu} variant="blue" onClick={onClick} />
      </div>
    </nav>
  );
};

export default TopNavbar;
