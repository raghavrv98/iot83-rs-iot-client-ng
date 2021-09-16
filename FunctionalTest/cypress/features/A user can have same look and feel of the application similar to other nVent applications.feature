Feature: A user can have same look and feel of the application similar to other nVent applications

    As a Raychem Supervisor user,
    I can have same look and feel of the application similar to other nVent applications.
    So that I can easily navigate and use the application.

    Background:
        Given I am on the "login" page

    Scenario Outline: A user can see common features on devices page in "<viewport>" view
        When I am on "<viewport>" view
        And I click on button with name "Sign In with TIDP"
        Then I should navigate to "home" page
        When I click on "DEVICES" navigation link
        Then I should navigate to "devices" page
        Then I should see "nventLogo" image
        Then I should see "RAYCHEM Supervisor" heading
        Then I should see navigation link with name "Devices" and matching icon
        * I should see navigation link with name "Alarms" and matching icon
        * I should see navigation link with name "Trends" and matching icon
        * I should see navigation link with name "Reports" and matching icon
        When I click on "initials" button
        Then I should see welcome message "Hello!"
        * I should see welcome message "nVent Demo"
        * I should see welcome message "Welcome to"
        * I should see welcome message "Shell Scotford"
        And I should see "logout" button
        When I click on "initials" button
        Then I should not see initials pop-up
        Then I should see "customerLogo" image
        Then I should see "filter" button and matching icon
        When I click on "filter" button
        Then I should see "<filter>" menu
        When I click on "settings" button
        Then I should see "addRemoveFilterModal" pop-up
        When I click on last element of filter checkbox
        And I click on "close" button
        Then I should see last element's value in filter menu list in "<viewport>"
        When I click on "settings" button
        And I click on last element of filter checkbox
        And I click on "close" button
        Then I should not see last element's value in filter menu list in "<viewport>"
        Then I should see "search" box with matching icon
        Then I should see "bookmark" box with matching icon
        Then I should see "alarmNotificationBtn" button
        Then I should see "export" button and matching icon
        When I click on "filter" button
        Then I should not see "<filter>" menu
        When I click on "logout" button
        Then I should see "tidp" button

        Examples:
            | viewport | filter     |
            | desktop  | filterMenu |
            | mobile   | filterBy   |

    Scenario Outline: A user can see pagination at the bottom on devices page in "<viewport>" view
        When I am on "<viewport>" view
        And I click on button with name "Sign In with TIDP"
        Then I should navigate to "home" page
        When I click on "DEVICES" navigation link
        Then I should navigate to "devices" page
        Then I should see "Records Per Page :" heading
        And I should see "Page of 1" heading
        * I should see "Total Records :" heading
        * I should see input box for current page
        * I should see "recordsPerPage" button
        * I should see "totalRecords" count
        When I click on "logout" button
        Then I should see "tidp" button

        Examples:
            | viewport |
            | desktop  |

    Scenario Outline: A user can see hamburger menu on devices page in <viewport> view
        When I am on "<viewport>" view
        And I click on button with name "Sign In with TIDP"
        Then I should navigate to "home" page
        When I click on "DEVICES" navigation link
        Then I should navigate to "devices" page
        And I click on hamburger menu
        Then I should see navigation link with name "Home" and matching icon
        * I should see navigation link with name "Devices" and matching icon
        * I should see navigation link with name "Alarms" and matching icon
        * I should see navigation link with name "Trends" and matching icon
        * I should see navigation link with name "Reports" and matching icon
        And I click on "logout" button
        Then I should see "tidp" button

        Examples:
            | viewport |
            | mobile   |
