import React from "react";
import { FaLeaf, FaUser } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

import Card from "@/components/Card";
import Typography from "@/components/Typography";

const CardSection = () => {
  return (
    <>
      <Typography className="text-blue-main" variant="h3" weight="bold">
        Card
      </Typography>
      <br />
      <section className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          variant="blue"
          title="Pendaftar"
          desc="Jumlah pendaftar On-Board-Unit per bulan September 2024"
          num="9"
          icon={FaUser}
        />
        <Card
          variant="red"
          title="Pelanggar"
          desc="Jumlah pelanggaran per hari Senin 2 September 2024"
          num="2"
          icon={IoIosWarning}
        />
        <Card
          variant="green"
          title="Kualitas Udara"
          desc="Index kualitas udara per hari Senin 2 September 2024"
          num="50"
          icon={FaLeaf}
        />
      </section>
    </>
  );
};

export default CardSection;
