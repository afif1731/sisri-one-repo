import { type Quality } from '@prisma/client';

import prisma from '../config/prisma';
import { type IUpdateAirQuality } from '../model';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SiRoadRepository = {
  async findRoadLane(road_lane: string) {
    return await prisma.roadLane.findFirst({
      where: { id: road_lane },
      include: {
        lane_traffic: true,
      },
    });
  },

  async findRoad(road_id: string) {
    return await prisma.road.findFirst({
      where: { id: road_id },
      include: {
        air_quality: true,
      },
    });
  },

  async findAirQualitySensor(air_quality_id: string) {
    return await prisma.airQuality.findFirst({
      where: { id: air_quality_id },
    });
  },

  async updateAirQuality(
    air_quality_id: string,
    data: IUpdateAirQuality,
    quality: Quality,
  ) {
    return await prisma.airQuality.update({
      where: { id: air_quality_id },
      data: {
        quality,
        ...data,
      },
    });
  },
};
