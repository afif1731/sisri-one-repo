import { PrismaClient } from '@prisma/client';

import csv from 'csvtojson';

const prisma = new PrismaClient();

export const trafficLamps = async () => {
  const dataTrafficLamps = await csv().fromFile(
    __dirname + '/../data/traffic-lamps.csv',
  );

  let trafficLamps = dataTrafficLamps.map(tlamp => ({
    id: tlamp.id,
    cctv_id: tlamp.cctv_id,
    yellow: Number(tlamp.yellow),
    green: Number(tlamp.green),
    red: Number(tlamp.red),
    order: Number(tlamp.order),
  }));

  for (const tlamp of trafficLamps) {
    await prisma.trafficLamp.upsert({
      where: { id: tlamp.id },
      create: {
        id: tlamp.id,
        road_cctv_id: tlamp.cctv_id,
        red_duration: tlamp.red,
        yellow_duration: tlamp.yellow,
        green_duration: tlamp.green,
        order: tlamp.order,
      },
      update: {
        road_cctv_id: tlamp.cctv_id,
        red_duration: tlamp.red,
        yellow_duration: tlamp.yellow,
        green_duration: tlamp.green,
        order: tlamp.order,
      },
    });
  }

  console.log('traffic lamp seeding done..');
};
