import { getAbsences } from '../../src/services/absences.service';

const everyItemContainsKey = key => collection =>
  collection.forEach(item =>
    expect(Object.keys(item).includes(key)).toBe(true),
  );

// describe('members', () => {
//   describe('every member has key', () => {
//     ['id', 'name', 'userId', 'image'].forEach(key => {
//       it(key, () => members().then(everyItemContainsKey(key)));
//     });
//   });
// });

describe('absences', () => {
  describe('every absence has key', () => {
    [
      'admitterNote',
      'confirmedAt',
      'createdAt',
      'crewId',
      'endDate',
      'id',
      'memberNote',
      'rejectedAt',
      'startDate',
      'type',
      'userId',
    ].forEach(key => {
      it(key, () => getAbsences().then(everyItemContainsKey(key)));
    });
  });
});
