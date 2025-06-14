import { PrismaClient } from '@prisma/client';

import csv from 'csvtojson';

const prisma = new PrismaClient();

export const cctvs = async () => {
  const dataCctvs = await csv().fromFile(__dirname + '/../data/road-cctvs.csv');

  let cctvs = dataCctvs.map(cctv => ({
    id: cctv.id,
    road_lane_id: cctv.road_lane_id,
    junction_id: cctv.junction_id,
  }));

  for (const cctv of cctvs) {
    await prisma.roadCctv.upsert({
      where: { id: cctv.id },
      create: {
        id: cctv.id,
        junction_id: cctv.junction_id,
        road_lane_id: cctv.road_lane_id,
      },
      update: {
        junction_id: cctv.junction_id,
        road_lane_id: cctv.road_lane_id,
      },
    });
  }

  console.log('road cctv seeding done..');
};
