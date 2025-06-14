import prisma from '../config/prisma';
import { type IPostViolation, type IUpdateLaneTraffic } from '../model';
import { defaultTrafficTime } from '../utils/traffic.utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SiTrafficRepository = {
  async getRoadList() {
    return await prisma.road.findMany({
      select: {
        id: true,
        road_name: true,
        junction: {
          select: {
            id: true,
            junction_num: true,
          },
        },
        air_quality: true,
        road_lane: true,
      },
    });
  },

  async findLaneTrafficById(lane_traffic_id: string) {
    return await prisma.laneTraffic.findFirst({
      where: { id: lane_traffic_id },
    });
  },

  async findRoadlaneById(road_lane_id: string) {
    return await prisma.roadLane.findFirst({ where: { id: road_lane_id } });
  },

  async findCctvById(cctv_id: string) {
    return await prisma.roadCctv.findFirst({
      where: { id: cctv_id },
      include: {
        road_lane: true,
        junction: true,
      },
    });
  },

  async updateLanetraffic(lane_traffic_id: string, data: IUpdateLaneTraffic) {
    return await prisma.laneTraffic.update({
      where: { id: lane_traffic_id },
      data: {
        traffic_flow: data.traffic_flow,
        vehicle_num: data.vehicle_num,
        detection_range: data.detection_range,
      },
      include: {
        RoadLane: {
          include: {
            road_cctv: true,
          },
        },
      },
    });
  },

  async getLampDurationBycctv(cctv_id: string) {
    return await prisma.trafficLamp.findFirst({
      where: { road_cctv_id: cctv_id },
      select: {
        id: true,
        red_duration: true,
        yellow_duration: true,
        green_duration: true,
        updated_at: true,
      },
    });
  },

  async getLampDurationById(lamp_id: string) {
    return await prisma.trafficLamp.findFirst({
      where: { id: lamp_id },
      select: {
        red_duration: true,
        yellow_duration: true,
        green_duration: true,
        updated_at: true,
      },
    });
  },

  async inputViolation(road_lane_id: string, data: IPostViolation) {
    return await prisma.trafficViolation.create({
      data: {
        road_lane_id,
        detail: data.detail,
        image_url: data.image,
      },
    });
  },

  async updateLampById(lamp_id: string, green?: number) {
    return await prisma.trafficLamp.update({
      where: { id: lamp_id },
      data: {
        red_duration: defaultTrafficTime.red,
        yellow_duration: defaultTrafficTime.yellow,
        green_duration: green,
      },
      select: {
        red_duration: true,
        yellow_duration: true,
        green_duration: true,
      },
    });
  },
  async updateLampByCctv(cctv_id: string, green?: number) {
    return await prisma.trafficLamp.updateMany({
      where: { road_cctv_id: cctv_id },
      data: {
        red_duration: defaultTrafficTime.red,
        yellow_duration: defaultTrafficTime.yellow,
        green_duration: green,
      },
    });
  },
};
