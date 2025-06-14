import express from 'express';
const router = express.Router();

import AuthRoutes from './auth.router';
import SiRoadRoutes from './si-road.router';
import SiTrafficRoutes from './si-traffic.router';

router.use('/auth', AuthRoutes);
router.use('/si-traffic', SiTrafficRoutes);
router.use('/si-road', SiRoadRoutes);

// eslint-disable-next-line import/no-default-export
export default router;
