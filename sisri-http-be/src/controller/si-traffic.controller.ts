import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse } from '../midleware';
import { type IPostViolation, type IUpdateLaneTraffic } from '../model';
import { SiTrafficService } from '../service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SiTrafficController = {
  async updateTrafficByCctv(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const data: IUpdateLaneTraffic = request.body;
      await SiTrafficService.updateTrafficByCctv(request.params.cctv_id, data);
      const result = new CustomResponse(StatusCodes.OK, 'traffic updated');

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      next(error);
    }
  },

  async updateTrafficById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const data: IUpdateLaneTraffic = request.body;
      await SiTrafficService.updatetrafficById(request.params.traffic_id, data);
      const result = new CustomResponse(StatusCodes.OK, 'traffic updated');

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      next(error);
    }
  },

  async getLampDurationByCctv(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const item = await SiTrafficService.getLampDurationByCctv(
        request.params.cctv_id,
      );
      const result = new CustomResponse(
        StatusCodes.OK,
        'get traffic duration',
        item,
      );

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      next(error);
    }
  },

  async getLampDurationById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const item = await SiTrafficService.getLampDurationById(
        request.params.lamp_id,
      );
      const result = new CustomResponse(
        StatusCodes.OK,
        'get traffic duration',
        item,
      );

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      next(error);
    }
  },

  async inputViolation(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const data: IPostViolation = request.body;
      await SiTrafficService.postViolation(request.params.cctv_id, data);

      const result = new CustomResponse(StatusCodes.OK, 'violation posted');

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      next(error);
    }
  },
};
