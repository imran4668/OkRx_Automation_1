Feature: feature to automate Form creation
Background:
Given User open mailinator and create a Mail
Given the user navigate to okrx sigin page
When the user enter the valid emailid 
When the user user click continue button
When the user validate the already signin context is coming or not
When the user enter the valid password 
When the user user click the signin button
Then the user validate the welcome context in dashboard
@sanity 
Scenario: Happy path scenario to create new form request
When the user click new request button
When the user click on start a new form button
When the user search test form inside search box
When the user click kim test form 
When the user click next button
When the user click search patient list button
When the user select the patient from dropdown
When the user click next button
When the user select the drugs from dropdown
When the user click next button
When the user select the prescribers from dropdown
When the user click the start form button
When the user check form generated or not


@sanity
Scenario: Create a new form request and send link to patient
When the user click new request button
And the user click on start a new form button
And the user search test form inside search box
And the user click kim test form 
And the user click next button
And the user click search patient list button
And the user select the patient from dropdown
And the user click next button
And the user select the drugs from dropdown
And the user click next button
And the user select the prescribers from dropdown
And the user click the start form button
And the user check form generated or not
And the user clicks the Send to Recipient button
And the user selects a patient from the list
And the user clicks the Send a Text Link button
And the user enables the "Email" checkbox
And the user enters a valid email address
And the user clicks the first Next button
And the user selects a field in the form
# And an action is displayed on the right side
And the user click last next button
And the user clicks the Proceed button
And Validate the Mail sent Successfully
And the user navigates to Mailinator
And the user should be able to view the latest email received
And the user clicks the Continue button
And the user clicks the Finish button
And the user clicks the Submit Anyway button
And the user verify the Successfull message after Submit


@sanity
Scenario: Create a new form request and send link to Prescriber
When the user click new request button
And the user click on start a new form button
And the user search test form inside search box
And the user click kim test form 
And the user click next button
And the user click search patient list button
And the user select the patient from dropdown
And the user click next button
And the user select the drugs from dropdown
And the user click next button
And the user select the prescribers from dropdown
And the user click the start form button
And the user check form generated or not
And the user clicks the Send to Recipient button    
And the user selects a Prescriber from the list
And the user clicks the Email Link button
And the user add the mail to receive 
And the user select Access code in Authentication Option
And the user clicks the first Next button
And the user selects a field in the form
And the user click last next button
And the user clicks the Proceed button
And Validate the Mail sent Successfully
And the user navigates to Mailinator
And the user should be able to view the latest email received
And the user Adding the AccessCode 
And the user clicks the Continue button in Authorization Page
And the user clicks the Continue button
And the user clicks the Finish button
And the user clicks the Submit Anyway button
And the user verify the Successfull message after Submit



