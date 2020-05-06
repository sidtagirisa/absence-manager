import { getAbsences } from '../services/absences.service';
import { addMemberNameToAbsences } from '../utils/transformer';
import { getMembers } from '../services/members.service';
import { exportEvents } from '../services/export.service';

const getListOfAbsences = async (req, res, next) => {
  try {
    const { userId = null, startDate = null, endDate = null } = req.query;
    const absences = await getAbsences(userId, startDate, endDate);
    if ((startDate && !endDate) || (!startDate && endDate)) {
      return res.status(422).json({
        message: 'start date and end date are both to be passed together',
      });
    }
    if (startDate > endDate) {
      return res.status(422).json({
        message: 'start date should be less than end date',
      });
    }
    const members = await getMembers();
    const absencesWithName = addMemberNameToAbsences(absences, members);
    return res.status(200).json({ absences: absencesWithName });
  } catch (error) {
    const message = 'Error while getting list of absences';
    console.error(message);
    console.error(error);
    res.status(500).json({ message });
  }
};

const exportAbsences = async (req, res, next) => {
  try {
    const { userId = null, startDate = null, endDate = null } = req.query;
    if ((startDate && !endDate) || (!startDate && endDate)) {
      return res.status(422).json({
        message: 'start date and end date are both to be passed together',
      });
    }
    if (startDate > endDate) {
      return res.status(422).json({
        message: 'start date should be less than end date',
      });
    }
    const absences = await getAbsences(userId, startDate, endDate);
    const members = await getMembers();
    const file = exportEvents(absences, members);
    return res.status(200).download(file);
  } catch (error) {
    const message = 'Error while exporting absences';
    console.error(message);
    console.error(error);
    res.status(500).json({ message });
  }
};

export { getListOfAbsences, exportAbsences };
