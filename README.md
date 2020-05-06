# Problem Statement

At crewmeister one of our products is the absence manager. With this product 
company owners can manage sickness and vacations of employees. Some of our 
customers want to export their employees absences to outlook. To make our 
customers happy we decided to provide an iCal export. 
https://en.wikipedia.org/wiki/ICalendar 

## User Story

As owner of a crew I want to be able to export my employees absences so 
that I can import them into outlook.

## Acceptance Criteria

- I can get a list of absences including the names of the employee (using api.js or api.rb)
- I can generate an iCal file and import it into outlook (maybe use a gem or npm package)
- I can see vacations of my employees as "#{member.name} is on vacation" 
- I can see sickness of my employees as "#{member.name} is sick" 
- (Bonus) I can go to http://localhost:3000 and download the iCal file
- (Bonus) I can go to http://localhost:3000?userId=123 and only receive the absences of the given user
- (Bonus) I can go to http://localhost:3000?startDate=2017-01-01&endDate=2017-02-01 and only receive the absences in the given date range
- (Bonus) Build the first 4 acceptance criteria in the other language (for backend candidates in js and for frontend candidates in ruby)

Please find README inside of server folder for more details about code.
