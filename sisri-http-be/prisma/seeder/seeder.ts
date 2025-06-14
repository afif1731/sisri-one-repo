import { PrismaClient } from '@prisma/client';

import {
  accounts,
  junctions,
  airQualities,
  laneTraffics,
  roads,
  roadLanes,
  cctvs,
  trafficLamps,
  trafficViolations,
} from './seed';

const prisma = new PrismaClient();

const main = async () => {
  await accounts();
  await junctions();
  await airQualities();
  await laneTraffics();
  await roads();
  await roadLanes();
  await cctvs();
  await trafficLamps();
  await trafficViolations();
};

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
