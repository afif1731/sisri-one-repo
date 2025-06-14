/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

import { SiTrafficController } from '../controller';
import { validate } from '../midleware';
import {
  UpdateTrafficCctvSchema,
  UpdateTrafficIdSchema,
  inputViolationSchema,
} from '../validator';

const router = express.Router();

router.post(
  '/cctv/:cctv_id/violation',
  validate(inputViolationSchema),
  SiTrafficController.inputViolation,
);
router.patch(
  '/cctv/:cctv_id/traffic',
  validate(UpdateTrafficCctvSchema),
  SiTrafficController.updateTrafficByCctv,
);
router.get('/cctv/:cctv_id/lamp', SiTrafficController.getLampDurationByCctv);

router.patch(
  '/lane-traffic/:traffic_id/traffic',
  validate(UpdateTrafficIdSchema),
  SiTrafficController.updateTrafficById,
);
router.get('/lamp/:lamp_id', SiTrafficController.getLampDurationById);

export default router;
