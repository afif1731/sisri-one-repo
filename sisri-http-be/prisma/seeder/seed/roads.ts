import { PrismaClient } from '@prisma/client';

import csv from 'csvtojson';

const prisma = new PrismaClient();

export const roads = async () => {
  const dataRoads = await csv().fromFile(__dirname + '/../data/roads.csv');

  let roads = dataRoads.map(road => ({
    id: road.id,
    name: road.name,
    length: Number(road.length),
    air_quality_id: road.air_quality_id,
    junction_id: road.junction_id,
  }));

  for (const road of roads) {
    await prisma.road.upsert({
      where: { id: road.id },
      create: {
        id: road.id,
        road_name: road.name,
        road_length: road.length,
        air_quality_id: road.air_quality_id,
        junction: {
          connect: {
            id: road.junction_id,
          },
        },
      },
      update: {
        road_name: road.name,
        road_length: road.length,
        air_quality_id: road.air_quality_id,
        junction: {
          connect: {
            id: road.junction_id,
          },
        },
      },
    });
  }

  console.log('road seeding done..');
};
