import { StatusCodes } from 'http-status-codes';

import { CustomError } from '../midleware';
import { type IUpdateAirQuality } from '../model';
import { SiRoadRepository } from '../repository';
import { getAqiQuality } from '../utils/air-quality.utils';
import { getTrafficSeverity } from '../utils/traffic.utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SiRoadService = {
  async getTrafficByLaneId(lane_id: string) {
    const isLaneExist = await SiRoadRepository.findRoadLane(lane_id);
    if (!isLaneExist)
      throw new CustomError(StatusCodes.NOT_FOUND, 'lane not found');

    const trafficStatus = getTrafficSeverity(
      isLaneExist.lane_traffic.traffic_flow,
      isLaneExist.lane_traffic.detection_range,
      isLaneExist.lane_traffic.vehicle_num,
    );

    return {
      traffic_flow: isLaneExist.lane_traffic.traffic_flow,
      traffic_density:
        isLaneExist.lane_traffic.vehicle_num /
        isLaneExist.lane_traffic.detection_range,
      traffic_status: trafficStatus,
      traffic_capacity: isLaneExist.capacity,
    };
  },

  async getAirQualityByRoadId(road_id: string) {
    const isRoadExist = await SiRoadRepository.findRoad(road_id);
    if (!isRoadExist)
      throw new CustomError(StatusCodes.NOT_FOUND, 'road not found');

    const isAirQualityExist = await SiRoadRepository.findAirQualitySensor(
      isRoadExist.air_quality_id,
    );
    if (!isAirQualityExist)
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        'air quality sensor not found',
      );

    return isAirQualityExist;
  },

  async updateAirQuality(air_quality_id: string, data: IUpdateAirQuality) {
    const isAirQualityExist =
      await SiRoadRepository.findAirQualitySensor(air_quality_id);
    if (!isAirQualityExist)
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        'air quality sensor not found',
      );

    const quality = getAqiQuality(data.aqi);

    await SiRoadRepository.updateAirQuality(air_quality_id, data, quality);
  },
};
