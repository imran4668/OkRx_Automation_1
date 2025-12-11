Feature: feature to automate the login functionality
Background: 
 Given the user navigate to okrx sigin page

@sanity
Scenario: Login to OkRx application without enetring email and clicking continue button
  When the user user click continue button
  Then the user should see an appropriate error message displayed for as email address with an invalid format

@sanity
Scenario: Login to OkRx application with an invalid email format
  When the user enters an email address with an invalid format
  When the user user click continue button
  Then the user should see an appropriate error message displayed for as email address with an invalid format
@sanity
Scenario: login into okrx application with invalid emailid 
When the user enter the invalid emailid 
When the user user click continue button
Then the user validate the already signin context is coming or not
When the user enter the valid password 
When the user user click the signin button
Then the user should see an appropriate error message displayed for entering the invalid emailid
@sanity 
Scenario: login into okrx application with valid emailid 
When the user enter the valid emailid 
When the user user click continue button
Then the user validate the already signin context is coming or not
When the user enter the valid password 
When the user user click the signin button
Then the user validate the welcome context in dashboard






