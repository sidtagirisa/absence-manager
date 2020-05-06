import express from 'express';
import {
  getListOfAbsences,
  exportAbsences,
} from './controllers/absences.controller';
/* Initialize router */
const router = express.Router();

router.get('/absences', getListOfAbsences);
router.get('/export/absences', exportAbsences);

export default router;
