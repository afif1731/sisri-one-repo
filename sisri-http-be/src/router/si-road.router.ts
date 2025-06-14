/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

import { SiRoadController } from '../controller';
import { validate } from '../midleware';
import { UpdateAirQualitySchema } from '../validator';

const router = express.Router();

router.get('/lane/:road_lane_id', SiRoadController.getTrafficByLaneId);
router.get(
  '/road/:road_id/air-quality',
  SiRoadController.getAirQualityByRoadId,
);
router.patch(
  '/air-quality/:air_quality_id',
  validate(UpdateAirQualitySchema),
  SiRoadController.updateAirQuality,
);

export default router;
