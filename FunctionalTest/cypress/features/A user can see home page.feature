Feature: A user can see home page

    As a Raychem Supervisor user, I can see the home page with dashboard.
    So that I can see a global overview of the application with access to quick summary.

    Background:
        Given I am on the "login" page

    Scenario Outline: A user can see home page features in "<viewport>" view
        When I am on "<viewport>" view
        And I click on button with name "Sign In with TIDP"
        Then I should navigate to "home" page
        Then I should see "RAYCHEM Supervisor" heading
        Then I should see "nventLogo" image
        Then I should see "customerLogo" image
        Then I should see welcome message "Hello!"
        * I should see welcome message "nVent Demo"
        * I should see welcome message "Welcome to"
        * I should see welcome message "Shell Scotford"
        Then I should see "logout" button
        Then I should see navigation link with name "DEVICES" and matching icon
        * I should see navigation link with name "ALARMS" and matching icon
        * I should see navigation link with name "TRENDS" and matching icon
        * I should see navigation link with name "REPORTS" and matching icon
        Then I should see quick summary chart
        Then I should see "Quick Summary" heading
        When I click on "logout" button
        Examples:
            | viewport |
            | desktop  |
            | mobile   |

    Scenario Outline: A user can navigate to device page features in "<viewport>" view
        When I am on "<viewport>" view
        And I click on button with name "Sign In with TIDP"
        Then I should navigate to "home" page
        When I click on "DEVICES" navigation link
        Then I should navigate to "devices" page
        When I click on "logout" button

        Examples:
            | viewport |
            | desktop  |
            | mobile   |

