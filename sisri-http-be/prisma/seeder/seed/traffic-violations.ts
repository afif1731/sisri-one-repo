import { PrismaClient } from '@prisma/client';

import csv from 'csvtojson';
import { existsSync, mkdirSync } from 'fs';
import { copyFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export const trafficViolations = async () => {
  const dataTrafficViolations = await csv().fromFile(
    __dirname + '/../data/traffic-violations.csv',
  );

  let trafficViolations = dataTrafficViolations.map(tv => {
    const cleanedImg = String(tv.image_url)
      .toLowerCase()
      .replace(/[ _-]+/g, '_');
    const imgPath = path.join(__dirname, '..', 'data/images', tv.image_url);
    const imgDbPath = `uploads/traffic-violations/1725574422_${cleanedImg}`;
    const imgDestPath = path.join(__dirname, '..', '..', '..', imgDbPath);
    return {
      id: tv.id,
      road_lane_id: tv.road_lane_id,
      detail: String(tv.detail).replace(/^["']|["']$/g, ''),
      cleanedImg,
      imgDbPath,
      imgPath,
      imgDestPath,
    };
  });

  const newDirPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'uploads/traffic-violations',
  );
  if (!existsSync(newDirPath)) {
    mkdirSync(newDirPath, { recursive: true });
  }

  for (const tv of trafficViolations) {
    await copyFile(tv.imgPath, tv.imgDestPath);

    await prisma.trafficViolation.upsert({
      where: { id: tv.id },
      create: {
        id: tv.id,
        road_lane_id: tv.road_lane_id,
        detail: tv.detail,
        image_url: tv.imgDbPath,
      },
      update: {
        road_lane_id: tv.road_lane_id,
        detail: tv.detail,
        image_url: tv.imgDbPath,
      },
    });
  }

  console.log('traffic violation seeding done..');
};
