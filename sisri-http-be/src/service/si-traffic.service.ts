import { StatusCodes } from 'http-status-codes';

import { CustomError } from '../midleware';
import { type IPostViolation, type IUpdateLaneTraffic } from '../model';
import { SiTrafficRepository } from '../repository';
import { countGreentime, defaultTrafficTime } from '../utils/traffic.utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SiTrafficService = {
  async updateTrafficByCctv(cctv_id: string, data: IUpdateLaneTraffic) {
    try {
      const isCctvExist = await SiTrafficRepository.findCctvById(cctv_id);
      if (!isCctvExist)
        throw new CustomError(StatusCodes.NOT_FOUND, 'cctv not found');

      const newData = await SiTrafficRepository.updateLanetraffic(
        isCctvExist.road_lane.lane_traffic_id,
        data,
      );

      const newGreenTime = countGreentime(
        newData.vehicle_num,
        newData.RoadLane[0].lane_num,
      );
      await SiTrafficRepository.updateLampByCctv(cctv_id, newGreenTime);
    } catch (error: any) {
      throw error;
    }
  },

  async updatetrafficById(lane_traffic_id: string, data: IUpdateLaneTraffic) {
    try {
      const isLaneTrafficExist =
        await SiTrafficRepository.findLaneTrafficById(lane_traffic_id);
      if (!isLaneTrafficExist)
        throw new CustomError(StatusCodes.NOT_FOUND, 'lane traffic not found');

      const newData = await SiTrafficRepository.updateLanetraffic(
        lane_traffic_id,
        data,
      );
      const newGreenTime = countGreentime(
        newData.vehicle_num,
        newData.RoadLane[0].lane_num,
      );
      await SiTrafficRepository.updateLampByCctv(
        newData.RoadLane[0].road_cctv[0].id,
        newGreenTime,
      );
    } catch (error: any) {
      throw error;
    }
  },

  async getLampDurationByCctv(cctv_id: string) {
    try {
      const isLampExist =
        await SiTrafficRepository.getLampDurationBycctv(cctv_id);
      if (!isLampExist)
        throw new CustomError(StatusCodes.NOT_FOUND, 'cctv not found');

      const currentTime = new Date(Date.now());
      const lastUpdated = new Date(isLampExist.updated_at);

      if (Number(currentTime) - Number(lastUpdated) >= 10 * 60 * 1000) {
        const newTime = await SiTrafficRepository.updateLampById(
          isLampExist.id,
          defaultTrafficTime.green,
        );

        return newTime;
      }

      delete isLampExist.id;
      delete isLampExist.updated_at;

      return isLampExist;
    } catch (error: any) {
      throw error;
    }
  },

  async getLampDurationById(lamp_id: string) {
    try {
      const isLampExist =
        await SiTrafficRepository.getLampDurationById(lamp_id);
      if (!isLampExist)
        throw new CustomError(StatusCodes.NOT_FOUND, 'lamp not found');

      const currentTime = new Date(Date.now());
      const lastUpdated = new Date(isLampExist.updated_at);

      if (Number(currentTime) - Number(lastUpdated) >= 10 * 60 * 1000) {
        const newTime = await SiTrafficRepository.updateLampById(
          lamp_id,
          defaultTrafficTime.green,
        );

        return newTime;
      }

      delete isLampExist.updated_at;

      return isLampExist;
    } catch (error: any) {
      throw error;
    }
  },

  async postViolation(cctv_id: string, data: IPostViolation) {
    try {
      const isCctvExist = await SiTrafficRepository.findCctvById(cctv_id);
      if (!isCctvExist)
        throw new CustomError(StatusCodes.NOT_FOUND, 'cctv not found');

      await SiTrafficRepository.inputViolation(isCctvExist.road_lane_id, data);
    } catch (error: any) {
      throw error;
    }
  },
};
