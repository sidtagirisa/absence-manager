import { writeFileSync } from 'fs';
import { transformDataToICSFormat } from '../utils/transformer';

const ics = require('ics');

const exportEvents = (absences, members) => {
  const events = transformDataToICSFormat(absences, members);
  const { error, value } = ics.createEvents(events);
  const filePath = `${__dirname}/../data/calendar.ics`;

  if (error) {
    const message = 'Error while creating events';
    console.error(message);
    console.error(error);
    throw Error(message);
  }

  writeFileSync(filePath, value, { flag: 'w' });
  return filePath;
};

export { exportEvents };
