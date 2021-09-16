Feature: A user can see device list

    As a Raychem Supervisor user, I can see device list on devices page.
    So that I can easily view them.

    Scenario Outline: A user can see device list on devices page in "<viewport>" view
        Given I am on "<viewport>" view
        And I am on the "login" page
        When I click on button with name "Sign In with TIDP"
        Then I should navigate to "home" page
        When I click on "DEVICES" navigation link
        Then I should navigate to "devices" page
        Then I should see device cards

        Examples:
            | viewport |
            | desktop  |

    Scenario Outline: A user can see pagination on devices page in "<viewport>" view
        When I am on "<viewport>" view
        Then I click on "recordsPerPage" button
        And I should see list of values in records per page dropdown

        Examples:
            | viewport |
            | desktop  |

    Scenario Outline: A user can see device cards on devices page in "<viewport>" view
        When I am on "<viewport>" view
        Then I should see default value of "recordsPerPage" is 50
        And I should see "deviceCards" count not greater than 50

        Examples:
            | viewport |
            | desktop  |

    Scenario Outline: A user can see disabled buttons on devices page in "<viewport>" view
        When I am on "<viewport>" view
        Then I should see "previousPage" button is disabled
        And I should see "backwards" button is disabled
        * I should see "nextPage" button is disabled
        * I should see "forward" button is disabled

        Examples:
            | viewport |
            | desktop  |

    Scenario Outline: A user can change device cards count on devices page in "<viewport>" view
        When I am on "<viewport>" view
        Then I click on 10 from the given options in records per page dropdown
        And I should see "deviceCards" count not greater than 10

        Examples:
            | viewport |
            | desktop  |

    Scenario Outline: A user can functionallity of next page button on devices page in "<viewport>" view
        When I am on "<viewport>" view
        And I should see 1 as a value in input box of current page
        Then I click on "nextPage" button
        And I should see 2 as a value in input box of current page

        Examples:
            | viewport |
            | desktop  |

    Scenario Outline: A user can functionallity of fast forward button on devices page in "<viewport>" view
        When I am on "<viewport>" view
        Then I click on "forward" button
        And I should see 5 as a value in input box of current page

        Examples:
            | viewport |
            | desktop  |

    Scenario Outline: A user can functionallity of previous page button on devices page in "<viewport>" view
        When I am on "<viewport>" view
        Then I click on "previousPage" button
        And I should see 4 as a value in input box of current page

        Examples:
            | viewport |
            | desktop  |

    Scenario Outline: A user can functionallity of fast backward button on devices page in "<viewport>" view
        When I am on "<viewport>" view
        Then I click on "backwards" button
        And I should see 1 as a value in input box of current page
        And I click on "logout" button
        Then I should see "tidp" button

        Examples:
            | viewport |
            | desktop  |
