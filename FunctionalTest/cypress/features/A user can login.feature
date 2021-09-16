Feature: A user can test authentication page

    As a Raychem Supervisor user, I can see the test page for authentication token.
    So that I can login with provided token.

    Background:
        Given I am on the "login" page

    Scenario Outline: A user can see test login page view
        When I am on "<viewport>" view
        Then I should see "RAYCHEM Supervisor" heading
        And I should see "nventLogo" image
        And I should see first line of branding text "WELCOME TO THE FUTURE OF"
        * I should see second line of branding text "Connection & Protection"
        When I click on button with name "Sign In with TIDP"
        Then I should see "logout" button
        When I click on "logout" button
        Then I should see "tidp" button

        Examples:
            | viewport |
            | desktop  |

