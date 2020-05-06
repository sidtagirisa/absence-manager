# Prerequisites

Versions used while programming: `node v12.7.0 (npm v6.10.0)`

1. Install node (v12 preferred, should work with v8 or v10 as well)
2. `npm i`

## Running Specs

`npm run test` or `npm run test:watch`

## Coverage

`npm run cover`

## Configurations Used

1. ExpressJs v4.17.1
2. eslint - airbnb with custom prettier config.
3. Jest is used for unit testing.
4. ics package for writing ics file.
5. Server Port: 3001, can be changed in `src/config/index.js`

## Decisions taken and Assumptions from problem statement

1. startDate and endDate should be passed together while querying absences in a period.
2. user id will also be considered if passed along with dates for querying
3. Export also behaves similar to get list i.e., filtering happening in export api as well.
4. While finding member from absences user id has been used as key.
5. status has been hard coded to 'CONFIRMED' in even because there is no rejected absence.
6. api.js has been split into `readJsonFile.util.js`, `absences.service.js`, `members.service.js`


## Curl requests for API

Get Absences
```
curl --request GET \
  --url 'http://localhost:3001/absences?userId=2664&startDate=2017-01-13&endDate=2017-01-15'
```

Export Absences

```
curl --request GET \
  --url 'http://localhost:3001/export/absences?userId=2664&startDate=2017-01-05&endDate=2017-01-15'
```
