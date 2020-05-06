import Moment from 'moment';
import path from 'path';
import readJsonFile from '../utils/readJsonFile.util';

import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const ABSENCES_PATH = path.join(__dirname, '../json_files', 'absences.json');

const getAbsences = async (userId, startDate, endDate) => {
  const totalAbsences = await readJsonFile(ABSENCES_PATH);
  let absences = totalAbsences;
  if (userId) {
    absences = absences.filter(absence => absence.userId === parseInt(userId));
  }
  if (startDate && endDate) {
    const range = moment.range(startDate, endDate);
    absences = absences.filter(
      absence =>
        range.contains(moment(absence.startDate)) &&
        range.contains(moment(absence.endDate)),
    );
  }

  return absences;
};

export { getAbsences };
