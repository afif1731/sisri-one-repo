import { PrismaClient } from '@prisma/client';

import csv from 'csvtojson';

const prisma = new PrismaClient();

export const junctions = async () => {
  const dataJunctions = await csv().fromFile(
    __dirname + '/../data/junctions.csv',
  );

  let junctions = dataJunctions.map(junction => ({
    id: junction.id,
    num: Number(junction.num),
  }));

  for (const junction of junctions) {
    await prisma.junction.upsert({
      where: { id: junction.id },
      create: {
        id: junction.id,
        junction_num: junction.num,
      },
      update: {
        junction_num: junction.num,
      },
    });
  }

  console.log('junctions seeding done..');
};
