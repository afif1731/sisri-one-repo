import { PrismaClient, type Quality } from '@prisma/client';

import csv from 'csvtojson';

const prisma = new PrismaClient();

export const airQualities = async () => {
  const dataAirQualities = await csv().fromFile(
    __dirname + '/../data/air-qualities.csv',
  );

  let airQualities = dataAirQualities.map(aq => ({
    id: aq.id,
    pm1: Number(aq.pm1),
    pm10: Number(aq.pm10),
    pm25: Number(aq.pm25),
    co: Number(aq.co),
    no2: Number(aq.no2),
    ozone: Number(aq.ozone),
    temperature: Number(aq.temperature),
    humidity: Number(aq.humidity),
    pressure: Number(aq.pressure),
    aqi: Number(aq.aqi),
    quality: aq.quality as Quality,
  }));

  for (const aq of airQualities) {
    await prisma.airQuality.upsert({
      where: { id: aq.id },
      create: {
        id: aq.id,
        pm1: aq.pm1,
        pm10: aq.pm10,
        pm25: aq.pm25,
        co: aq.co,
        no2: aq.no2,
        ozone: aq.ozone,
        temperature: aq.temperature,
        humidity: aq.humidity,
        pressure: aq.pressure,
        aqi: aq.aqi,
        quality: aq.quality,
      },
      update: {
        pm1: aq.pm1,
        pm10: aq.pm10,
        pm25: aq.pm25,
        co: aq.co,
        no2: aq.no2,
        ozone: aq.ozone,
        temperature: aq.temperature,
        humidity: aq.humidity,
        pressure: aq.pressure,
        aqi: aq.aqi,
        quality: aq.quality,
      },
    });
  }

  console.log('air quality seeding done..');
};
