Feature: feature to automate the login functionality
Scenario: login into okrx application with valid emailid 
Given the user navigate to okrx sigin page
When the user enter the valid emailid 
When the user user click continue button
Then the user validate the already signin context is coming or not
When the user enter the valid password 
When the user user click the signin button

