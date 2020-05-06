import path from 'path';
import {
  exportAbsences,
  getListOfAbsences,
} from '../../src/controllers/absences.controller';
import * as AbsenceService from '../../src/services/absences.service';
import {
  listOfAbsencesWithoutQuery,
  listOfAbsencesWithQuery,
} from '../responses';

describe('#AbsenceController', () => {
  describe('##getListOfAbsences', () => {
    let req;
    let res;
    beforeEach(() => {
      res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      res.status = jest.fn().mockReturnValue({
        json: res.json,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return all absences with name of member', async () => {
      req = { query: {} };
      await getListOfAbsences(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(listOfAbsencesWithoutQuery);
    });

    it('should return absences between dates with name of member', async () => {
      req = { query: { startDate: '2017-01-13', endDate: '2017-01-15' } };
      await getListOfAbsences(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(listOfAbsencesWithQuery);
    });

    it('should return absences between dates and for user id with name of member', async () => {
      req = {
        query: { userId: 2664, startDate: '2017-01-13', endDate: '2017-01-15' },
      };
      await getListOfAbsences(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(listOfAbsencesWithQuery);
    });

    it('should throw 422 startDate > endDate', async () => {
      req = {
        query: { startDate: '2017-01-16', endDate: '2017-01-15' },
      };
      await getListOfAbsences(req, res);
      expect(res.status).toBeCalledWith(422);
      expect(res.json).toBeCalledWith({
        message: 'start date should be less than end date',
      });
    });

    it('should throw 422 endDate null', async () => {
      req = {
        query: { startDate: '2017-01-16' },
      };
      await getListOfAbsences(req, res);
      expect(res.status).toBeCalledWith(422);
      expect(res.json).toBeCalledWith({
        message: 'start date and end date are both to be passed together',
      });
    });

    it('should throw 500 if any of the service throws', async () => {
      req = { query: {} };
      // fail absence service on purpose to test error
      const getAbsencesMock = jest.spyOn(AbsenceService, 'getAbsences');
      getAbsencesMock.mockRejectedValue('some-error');

      await getListOfAbsences(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({
        message: 'Error while getting list of absences',
      });
      getAbsencesMock.mockRestore();
    });
  });

  describe('##exportAbsences', () => {
    let req;
    let res;
    const pathOfTheFile = path.join(__dirname, '../../src/data/calendar.ics');
    beforeEach(() => {
      res = {
        download: jest.fn(),
        json: jest.fn(),
        status: jest.fn(),
      };

      res.status = jest.fn().mockReturnValue({
        download: res.download,
        json: res.json,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should export all absences in the calendar format', async () => {
      req = { query: {} };
      await exportAbsences(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.download).toBeCalledWith(pathOfTheFile);
    });

    it('should throw 422 startDate > endDate', async () => {
      req = {
        query: { startDate: '2017-01-16', endDate: '2017-01-15' },
      };
      await exportAbsences(req, res);
      expect(res.status).toBeCalledWith(422);
      expect(res.json).toBeCalledWith({
        message: 'start date should be less than end date',
      });
    });

    it('should throw 422 endDate null', async () => {
      req = {
        query: { startDate: '2017-01-16' },
      };
      await exportAbsences(req, res);
      expect(res.status).toBeCalledWith(422);
      expect(res.json).toBeCalledWith({
        message: 'start date and end date are both to be passed together',
      });
    });

    it('should throw 500 if any of the service throws', async () => {
      req = { query: {} };
      // fail absence service on purpose to test error
      const getAbsencesMock = jest.spyOn(AbsenceService, 'getAbsences');
      getAbsencesMock.mockRejectedValue('some-error');

      await exportAbsences(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({
        message: 'Error while exporting absences',
      });
      getAbsencesMock.mockRestore();
    });
  });
});
