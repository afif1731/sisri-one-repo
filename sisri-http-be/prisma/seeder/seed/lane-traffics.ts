import { PrismaClient } from '@prisma/client';

import csv from 'csvtojson';

const prisma = new PrismaClient();

export const laneTraffics = async () => {
  const dataLaneTraffics = await csv().fromFile(
    __dirname + '/../data/lane-traffics.csv',
  );

  let laneTraffics = dataLaneTraffics.map(lt => ({
    id: lt.id,
    traffic_flow: Number(lt.traffic_flow),
    vehicle_num: Number(lt.vehicle_num),
    detection_range: Number(lt.detection_range),
  }));

  for (const lt of laneTraffics) {
    await prisma.laneTraffic.upsert({
      where: { id: lt.id },
      create: { ...lt },
      update: {
        traffic_flow: lt.traffic_flow,
        vehicle_num: lt.vehicle_num,
        detection_range: lt.detection_range,
      },
    });
  }

  console.log('lane traffic seeding done..');
};
