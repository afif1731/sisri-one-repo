import React from "react";
import { FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

import ButtonLink from "@/components/links/ButtonLink";

const Home = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <p className="font-montserrat_alternates text-4xl font-semibold md:text-9xl">
        SISRI Monitor <br /> Lalu Lintas <br /> Dasbor Pintar
      </p>
      <div className="space-x-2">
        <ButtonLink variant="blue" leftIcon={RiAdminFill} href="/admin">
          Admin
        </ButtonLink>
        <ButtonLink variant="secondary" leftIcon={FaUser} href="/user">
          User
        </ButtonLink>
      </div>
    </section>
  );
};

export default Home;
