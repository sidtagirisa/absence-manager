import { getMembers } from '../../src/services/members.service';

const everyItemContainsKey = key => collection =>
  collection.forEach(item =>
    expect(Object.keys(item).includes(key)).toBe(true),
  );

describe('members', () => {
  describe('every member has key', () => {
    ['id', 'name', 'userId', 'image'].forEach(key => {
      it(key, () => getMembers().then(everyItemContainsKey(key)));
    });
  });
});
