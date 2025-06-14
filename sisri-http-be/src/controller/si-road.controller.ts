import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { type IUpdateAirQuality } from 'model';

import { CustomResponse } from '../midleware';
import { SiRoadService } from '../service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SiRoadController = {
  async getTrafficByLaneId(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const item = await SiRoadService.getTrafficByLaneId(
        request.params.road_lane_id,
      );
      const result = new CustomResponse(
        StatusCodes.OK,
        'get lane traffic',
        item,
      );

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      next(error);
    }
  },

  async getAirQualityByRoadId(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const item = await SiRoadService.getAirQualityByRoadId(
        request.params.road_id,
      );
      const result = new CustomResponse(
        StatusCodes.OK,
        'get air quality data',
        item,
      );

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      next(error);
    }
  },

  async updateAirQuality(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const data: IUpdateAirQuality = request.body;
      await SiRoadService.updateAirQuality(request.params.air_quality_id, data);
      const result = new CustomResponse(
        StatusCodes.OK,
        'air quality successfully updated',
      );

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      next(error);
    }
  },
};
