import { exportEvents } from '../../src/services/export.service';
import * as ics from 'ics';
import path from 'path';
import fs from 'fs';

const pathOfTheFile = path.join(__dirname, '../../src/data/calendar.ics');

describe('#Export Service', () => {
  describe('##exportEvents', () => {
    it('should write null to data/calendar.ics file if no absences and members', () => {
      const absences = [];
      const members = [];

      exportEvents(absences, members);

      const data = fs.readFileSync(pathOfTheFile, 'utf8', (_, data) => data);
      expect(data).toBe('null');
    });

    it('should throw if ics gives error', () => {
      const createEventsMock = jest.spyOn(ics, 'createEvents');
      createEventsMock.mockReturnValue({
        error: { message: 'some-error', name: 'test-error' },
      });

      const absences = [];
      const members = [];

      try {
        exportEvents(absences, members);
      } catch (error) {
        expect(error).toEqual(Error('Error while creating events'));
      }
    });
  });
});
