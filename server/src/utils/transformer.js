import moment from 'moment';

const message = {
  sickness: 'is sick',
  vacation: 'is on vacation',
};

const addMemberNameToAbsences = (absences, members) => {
  return absences.map(absence => {
    const member = members.find(member => member.userId === absence.userId);
    return {
      ...absence,
      name: member.name,
    };
  });
};

const transformDataToICSFormat = (absences, members) => {
  return absences.map(absence => {
    const member = members.find(member => member.userId === absence.userId);
    return {
      start: moment(absence.startDate).format('YYYY-M-D-H-m').split('-'),
      startInputType: 'utc',
      startOutputType: 'local',
      end: moment(absence.startDate).format('YYYY-M-D-H-m').split('-'),
      endInputType: 'utc',
      endOutputType: 'local',
      uid: String(absence.id),
      title: `${member.name} ${message[absence.type]}`,
      description: `member note: ${absence.memberNote}, admitter note: ${absence.admitterNote}`,
      categories: [absence.type],
      status: 'CONFIRMED',
    };
  });
};

export { addMemberNameToAbsences, transformDataToICSFormat };
