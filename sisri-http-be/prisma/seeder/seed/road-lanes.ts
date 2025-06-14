import { type Direction, PrismaClient } from '@prisma/client';

import csv from 'csvtojson';

const prisma = new PrismaClient();

export const roadLanes = async () => {
  const dataRoadLanes = await csv().fromFile(
    __dirname + '/../data/road-lanes.csv',
  );

  let roadLanes = dataRoadLanes.map(rl => ({
    id: rl.id,
    road_id: rl.road_id,
    lane_traffic_id: rl.lane_traffic_id,
    lane_num: Number(rl.lane_num),
    capacity: Number(rl.capacity),
    direction: rl.direction as Direction,
  }));

  for (const rl of roadLanes) {
    await prisma.roadLane.upsert({
      where: { id: rl.id },
      create: {
        id: rl.id,
        road_id: rl.road_id,
        lane_traffic_id: rl.lane_traffic_id,
        lane_num: rl.lane_num,
        capacity: rl.capacity,
        direction: rl.direction,
      },
      update: {
        road_id: rl.road_id,
        lane_traffic_id: rl.lane_traffic_id,
        lane_num: rl.lane_num,
        capacity: rl.capacity,
        direction: rl.direction,
      },
    });
  }

  console.log('road lane seeding done..');
};
